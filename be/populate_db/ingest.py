# pip install pandas openpyxl python-dotenv sqlalchemy psycopg2
import os
import time
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import create_engine

from const import *

load_dotenv(find_dotenv())

if not UNI_GPAS_XLSX_PATH.exists() or not UNI_GPAS_XLSX_PATH.is_file():
    print("Please ensure uni GPAS Excel file exists and is in the path data/gpas.xlsx")

if not UNI_COURSES_CSV_PATH.exists() or not UNI_COURSES_CSV_PATH.is_file():
    print("Please ensure uni data CSV exists and is in the path data/data.csv")


def get_connstring() -> None | str:
    POSTGRES_USER: str | None = os.getenv("PG_USER")
    POSTGRES_PASSWORD: str | None = os.getenv("PASSWORD")
    POSTGRES_PORT: int | None = int(os.getenv("PG_PORT"))
    POSTGRES_HOST: str | None = os.getenv("HOST")
    # POSTGRES_HOST: str = "localhost"
    POSTGRES_DATABASE: str | None = os.getenv("DATABASE")

    return f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"


def insert_uni_data(uni_gpas_df: pd.DataFrame, connstring: str) -> None:
    conn = create_engine(connstring)
    uni_gpas_df.to_sql('university', con=conn, if_exists="append", index=False)
    print("University data inserted")


def insert_tag_data(uni_tags_df: pd.DataFrame, connstring: str) -> None:
    conn = create_engine(connstring)
    # tags_df: pd.DataFrame = pd.DataFrame(ALL_TAGS, columns=['name'])
    # tags_df.to_sql('tag', con=conn, if_exists="append", index=False)
    # print("Tags inserted")
    uni_tags_df.to_sql('uni_tag', con=conn, if_exists="append", index=False)
    print("University tags inserted")


def insert_course_mapping(course_mapping_df: pd.DataFrame, connstring: str) -> None:
    conn = create_engine(connstring)
    course_mapping_df.to_sql('course_mapping', con=conn, if_exists="append", index=False)
    print("Course mapping inserted")


def is_db_up() -> bool:
    conn = create_engine(get_connstring())

    try:
        test_conn = conn.connect()
        test_conn.close()

        return True
    except:
        return False


'''
GPAs to-do
- OHE GPAs for diff degrees
- Convert "Central Asia" to "Asia" in Region
- Rename columns
'''

uni_gpas_df: pd.DataFrame = pd.read_excel(UNI_GPAS_XLSX_PATH)
# Remove text
uni_gpas_df = uni_gpas_df.iloc[3:]
# Set column names
uni_gpas_df.columns = uni_gpas_df.iloc[0]
# Remove set column names
uni_gpas_df = uni_gpas_df.iloc[1:]
# Reset indices
uni_gpas_df = uni_gpas_df.reset_index(drop=True)

# Rename columns
uni_gpas_df = uni_gpas_df.rename(columns=COLUMN_RENAME_MAPPING)

# Change "Central Asia" to "Asia"
uni_gpas_df.loc[uni_gpas_df["continent"] == "Central Asia", "continent"] = "Asia"

# Cast column types
uni_gpas_df["gpa_10_percentile"] = uni_gpas_df["gpa_10_percentile"].astype(float)
uni_gpas_df["gpa_90_percentile"] = uni_gpas_df["gpa_90_percentile"].astype(float)

# Remove newlines
uni_gpas_df = uni_gpas_df.replace(r'\n',' ', regex=True)

'''
Create uni_tags entries

Format: {uni_name: ["list", "of", "degree", "names"], uni_name_2: ["list", "of", "degree", "names"]}
'''

# print(uni_gpas_df["applicable_to"].unique().tolist())

uni_gpas_df["applicable_to"] = uni_gpas_df["applicable_to"].apply(lambda x: APPLICABLE_TO_MAPPING[x])

# For initializing uni tags
uni_tags_df: pd.DataFrame = uni_gpas_df.loc[:, ["name", "applicable_to"]]
# uni_tags_dict: Dict[str, List[str]] = dict(zip(uni_tags_df["name"], uni_tags_df["applicable_to"]))

# Drop columns not in DB
uni_gpas_df = uni_gpas_df.drop(columns=["ORG_ID", "applicable_to", "gpa_requirement"])

# uni_gpas_df = pd.get_dummies(uni_gpas_df, columns=["applicable_to"])

# print(uni_gpas_df[["applicable_to"]].join(uni_gpas_df.applicable_to.str.join('|').str.get_dummies().add_prefix('applicable_to_')))

# Explode
uni_tags_df = uni_tags_df.explode("applicable_to")
# Rename columns
uni_tags_df = uni_tags_df.rename(columns=TAG_COLUMN_RENAME_MAPPING)

course_mapping_df: pd.DataFrame = pd.read_csv(UNI_COURSES_CSV_PATH)
course_mapping_df = course_mapping_df.rename(columns=COURSE_MAPPING_COLUMN)

try:
    if not DONE_INDICATOR.is_file():

        while not is_db_up():
            time.sleep(0.1)
            print("Waiting 0.1s")

        insert_uni_data(uni_gpas_df, get_connstring())
        insert_tag_data(uni_tags_df, get_connstring())
        insert_course_mapping(course_mapping_df, get_connstring())

        DONE_INDICATOR.touch()
except:
    print("Ingestion failed")




# print(uni_gpas_df["applicable_to"].unique())
# uni_courses_df: pd.DataFrame = pd.read_csv(UNI_COURSES_CSV_PATH)


