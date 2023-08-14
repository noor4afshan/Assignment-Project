<template>
    <div class="container-fluid mt-5">
        <div> <br>
            <span class="d-flex justify-content-end "> Show
                <select v-model="pageSize" @change="updatePage">
                    <option v-for="size in pageSizeoptions" :key="size" :value="size">{{ size }}</option>
                </select> on page
            </span>
        </div> <br>
        <!-- <div class="table-container" style="max-height: 400px; overflow-y: auto;"> -->
        <table class="table table-bordered">
            <thead class="table-secondary text-center">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ getFullName(user.name) }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.dob.age }}</td>
                    <td>{{ user.location.city }}</td>
                    <td>{{ user.location.country }}</td>
                    <td>
                        <RouterLink :to="{ name: 'userDetails', params: { id: index } }">
                            <i class='fas fa-eye' style='font-size:22px;color:rgb(54, 143, 244); margin-right: 7px;'></i>
                        </RouterLink>

                        <i @click="handleEditUser(user)" class='fas fa-edit'
                            style='font-size:20px; color:green; cursor: pointer; margin-right: 7px;'></i>

                        <i @click="deleteUser(user.id)" class="fas fa-trash-alt"
                            style="font-size:19px;color:rgb(201, 3, 3); cursor:pointer;margin-right: 7px; "></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- </div> -->

        <!-- Pagination -->

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="pagination">
                        <button class="btn btn-sm bg-secondary-subtle me-1" @click="prePage"
                            :disabled="currentPage === 1">&lt;</button>
                        <div class="btn-group" role="group">
                            <button v-for="page in visiblePages" :key="page" @click="gotoPage(page)"
                                :class="['btn', 'btn-sm', { 'bg-secondary-subtle me-1': currentPage !== page, 'btn-success': currentPage === page }]">
                                {{ page }}
                            </button>
                        </div>
                        <button class="btn btn-sm bg-secondary-subtle " @click="nextPage"
                            :disabled="currentPage === totalPages">&gt;</button>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="d-flex justify-content-end mb-4 ">
                        <span class="bg-secondary-subtle p-1 px-2 rounded justify-content-end d-flex"> {{ (currentPage - 1)
                            *
                            pageSize + 1 }} - {{ Math.min(currentPage * pageSize, users.length) }} of {{ this.users.length }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <editUser v-if="editingUser" :user="editingUser" @update-user="updateUser" @cancel-edit="cancelEdit" />
    </div>
</template>

<script>
import editUser from './editUser.vue';
import { RouterLink } from 'vue-router';

export default {
    components: {
        editUser
    },

    data() {
        return {
            users: [],
            pageSize: 100,
            currentPage: 1,
            pageSizeoptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            editingUser: null,
            visiblePageCount: 6,
        }
    },
    created() {
        this.fetchUsersFromLocalStorage();
    },
    methods: {
        deleteUser(id) {
            if (!window.confirm('Are you sure ?')) {
                return;
            }
            this.users = this.users.filter((user) => user.id !== id);
            console.log('Deleted', id);
            // Update local storage 
            localStorage.setItem('fetchData', JSON.stringify(this.users));
        },
        fetchUsersFromLocalStorage() {
            const usersFromLocalStorage = JSON.parse(localStorage.getItem('fetchData') || '[]');
            this.users = usersFromLocalStorage;
        },
        prePage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },
        gotoPage(page) {
            this.currentPage = page
        },
        updatePage() {
            this.currentPage = 1;
        },

        // edit
        handleEditUser(user) {

            this.editingUser = { ...user };
        },
        updateUser(updatedUser) {
            const index = this.users.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) {
                this.users.splice(index, 1, updatedUser);
            }
            this.editingUser = null;
        },
        cancelEdit() {
            this.editingUser = null;
        },


    },
    computed: {
        getFullName() {
            return (nameobj) => `${nameobj.title} ${nameobj.first} ${nameobj.last}`
        },
        totalPages() {
            return Math.ceil(this.users.length / this.pageSize);
        },
        paginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.users.slice(startIndex, endIndex);
        },
        visiblePages() {
            const half = Math.floor(this.visiblePageCount / 2);
            const start = Math.max(this.currentPage - half, 1);
            const end = Math.min(start + this.visiblePageCount - 1, this.totalPages);
            const count = this.visiblePageCount - (end - start + 1);

            if (count > 0) {
                start = Math.max(start - count, 1);
            }

            const visiblePages = [];
            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        },

    }
};
</script>

<style lang= scoped>

</style>