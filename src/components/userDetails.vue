<template>
    <div>
        <div class="container mt-5">
            <RouterLink :to="{ name: 'userList' }">
                <button type="button" class="btn btn-success btn-sm float-end mt-4">Back</button>
            </RouterLink>
            <h4 class=" pt-4">My Profile</h4>
        </div>
    </div>
   
    <div class="container p-3 my-4 border rounded">
        <div class="row">
            <div class="col-md-2">
                <img :src="user.picture.large" alt="" class="img-fluid rounded-circle" style="height: 80px; width: 80px;">
            </div>
            <div class="col-md-2">
                <h5 class="text-success ">{{ getFullName(user.name) }}</h5>
                <p>{{ user.location.country }}</p>
            </div>
        </div>
    </div>

    <div class="container p-3 my-4 border rounded">
        <h5 class="pe-3  fw-bold">Personal Information</h5>
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th>First Name:</th>
                    <th>Last Name:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.name.first }}</td>
                    <td>{{ user.name.last }}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Gender:</th>
                    <th>Phone:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.phone }}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Email:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>

        </table>
    </div>

    <div class="container p-3 my-4 border rounded">
        <h5 class="pe-3  fw-bold">Address</h5>
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th>City:</th>
                    <th>State:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.location.city }}</td>
                    <td>{{ user.location.state }}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Country:</th>
                    <th>Post Code:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.location.country }}</td>
                    <td>{{ user.location.postcode }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {


    data() {
        return {
            user: null,
        };
    },

    created() {

        this.fetchUserDetails(this.$route.params.id);
    },

    methods: {
        fetchUserDetails(userId) {
            const usersFromLocalStorage = JSON.parse(localStorage.getItem('fetchData') || '[]');
            const user = usersFromLocalStorage[userId]
            if (user) {
                this.user = user;
            }
        },
        getFullName(nameobj) {
            return `${nameobj.title} ${nameobj.first} ${nameobj.last}`;
        },
    },
    components: {
        RouterLink,
    },
};
</script>

<style  scoped>

</style>