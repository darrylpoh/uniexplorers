# pip install pandas openpyxl

from pathlib import Path

import pandas as pd

UNI_GPAS_XLSX_PATH: Path = Path("data/gpas.xlsx")
UNI_COURSES_CSV_PATH: Path = Path("data/data.csv")

if not UNI_GPAS_XLSX_PATH.exists() or not UNI_GPAS_XLSX_PATH.is_file():
    print("Please ensure uni GPAS Excel file exists and is in the path data/gpas.xlsx")

if not UNI_COURSES_CSV_PATH.exists() or not UNI_COURSES_CSV_PATH.is_file():
    print("Please ensure uni data CSV exists and is in the path data/data.csv")


uni_gpas_df: pd.DataFrame = pd.read_excel(UNI_GPAS_XLSX_PATH)
# Remove text
uni_gpas_df = uni_gpas_df.iloc[3:]
# Set column names
uni_gpas_df.columns = uni_gpas_df.iloc[0]
# Remove set column names
uni_gpas_df = uni_gpas_df.iloc[1:]
# Reset indices
uni_gpas_df = uni_gpas_df.reset_index(drop=True)
# print(uni_gpas_df.head())

# uni_courses_df: pd.DataFrame = pd.read_csv(UNI_COURSES_CSV_PATH)


