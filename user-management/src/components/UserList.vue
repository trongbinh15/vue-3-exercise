<template>
	<div class="header">
		<h1>List users</h1>
		<div v-if="currentUser">
			<span>Welcome {{currentUser.name}}</span>
			<button @click="logout" color="primary">, logout</button>
		</div>
	</div>
	<v-btn class="mb-2" color="primary" @click="onAdd">Add new</v-btn>
	<table>
		<tr>
			<th>Name</th>
			<th>Phone</th>
			<th>Email</th>
			<th>Actions</th>
		</tr>
		<tr v-for="user in users">
			<td>{{ user.name }}</td>
			<td>{{ user.phone }}</td>
			<td>{{ user.email }}</td>
			<td>
				<v-icon dark right @click="onEdit(user.id)">mdi-square-edit-outline</v-icon>
				<v-icon dark right @click="onDelete(user.id)">mdi-delete</v-icon>
			</td>
		</tr>
	</table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DELETE_USER, LOAD_USER_LIST,  LOG_OUT } from '../store/actions.type';

export default {
	name: 'UserList',
	computed: {
		...mapGetters(["users", "currentUser"])
	},
	methods: {
		...mapActions({
			loadUserList: LOAD_USER_LIST,
			deleteUser: DELETE_USER,
			logout: LOG_OUT
		}),
		onEdit(id) {
			this.$router.push({ name: 'users', params: { id } });
		},
		onAdd() {
			this.$router.push({ name: 'users', params: { id: 'new' } });
		},
		async onDelete(id) {
			await this.deleteUser(id);
		},
	},

    watch: {
        currentUser(newUser, oldUser) {
            if(!newUser){
                this.$router.go();
            }
        }
    },
	async mounted() {
		await this.loadUserList();
	}
}
</script>
<style scoped>
table {
	border-collapse: collapse;
	width: 100%;
}

td,
th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #dddddd;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
}
</style>
