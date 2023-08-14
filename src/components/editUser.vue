<template>
  <div v-if="user" class="container-sm">
    <h3>Edit User</h3>
    <div class="form-group">
      <label for="name">First Name:</label>
      <input class="form-control mt-2" id="name" type="text" v-model="editedUser.name.first" />
    </div>
    <div>
      <label class="mt-2" for="name">Last Name:</label>
      <input class="form-control mt-2" id="name" type="text" v-model="editedUser.name.last" />
    </div>
    <div>
      <label class="mt-2" for="email">Email:</label>
      <input class="form-control mt-2" id="email" type="email" v-model="editedUser.email" />
    </div>
    <div>
      <label class="mt-2" for="age">Age:</label>
      <input class="form-control mt-2" id="age" type="number" v-model="editedUser.dob.age" />
    </div>
    <div>
      <label class="mt-2" for="city">City:</label>
      <input class="form-control mt-2" id="city" type="text" v-model="editedUser.location.city" />
    </div>
    <div>
      <label class="mt-2" for="country">Country:</label>
      <input class="form-control mt-2" id="country" type="text" v-model="editedUser.location.country" />
    </div>
    <button type="button" class="btn btn-success my-2 me-3 px-3" @click="saveChanges">Save</button>
    <button type="button" class="btn btn-outline-success my-3 me-2" @click="cancelEdit">Cancel</button>
  </div>
</template>
  
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

      editedUser: null,
    };
  },
  created() {


    this.editedUser = { ...this.user };
  },

  methods: {
    saveChanges() {
      this.$emit('update-user', this.editedUser);
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
  },
};
</script>
  