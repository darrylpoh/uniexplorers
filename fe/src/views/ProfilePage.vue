<template>
  <div class="flex my-24">
    <div class="bg-white mr-10 flex flex-col justify-center items-center w-1/5 mx-auto rounded-lg">
      <img src="../../public/Profile Female.png" alt="" class="mb-24">
      <p class="mb-16">Singapore Management University</p>
      <p>6 Reviews</p>
    </div>
    <div class="w-3/5 bg-white mx-auto rounded-lg p-10">
      <form action="" class="relative">
        <label for="">Name</label>
        <input type="text" v-model="name" @keydown="inputChange">
        
        <label for="">Email</label>
        <input type="email" v-model="email" disabled>
        
        <label for="">New Password</label>
        <input type="password" v-model="password"  @keydown="inputChange">
        
        <label for="">Confirm New Password</label>
        <input type="password" v-model="newPassword">
        
        <label for="">Status</label>
        <select name="" id="" v-model="status"  @change="inputChange">
          <option value="alumni">Alumni</option>
          <option value="student">Student</option>
        </select>
        
        <label for="">Exchange School</label>
        <select name="" id="" v-model="exchangeSchool" class="mb-16"  @change="inputChange">
          <option value="bocconi">Bocconi University</option>
          <option value="chattahoochee">Chattahoochee Valley Community College</option>
        </select>

        <div class="flex justify-end">
          <button :disabled="noChangesMade" class="">Save Changes <span class="text-orange text-2xl align-middle">&#62;</span></button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Mario',
      email: 'mario@gmail.com',
      password: '12345678',
      newPassword: '',
      status: 'alumni',
      exchangeSchool: 'bocconi',
      noChangesMade: true,
    }
  },
  methods: {
    inputChange() {
      this.noChangesMade = false
    },
  }
}
</script>

<style>
  label, input, select {
    display: block;
    font-weight: bold;
    font-size: 1.2em;
    color: black;
  }
  input, select {
    font-weight: normal;
    display: block;
    padding: 10px 6px;
    width: 40%;
    box-sizing: border-box;
    border-width: 1px;
    border-color: #979393;
    border-radius: 10px;
    margin: 5px 0 20px
  }
  button {
    padding: 10px 20px;
    background-color: #1E363E;
    border-radius: 4px;
    color: white;
  }
  button:disabled {
    background-color: #908d8d;

  }
</style>

<style scoped>
p {
    color: #aba5a5;
    font-size: 1.2em;
  }
</style>