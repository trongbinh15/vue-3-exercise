<template>
	<div class="header">
		<h1>List users</h1>
		<div v-if="currentUser">
			<span>Welcome {{ currentUser.name }}</span>
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
<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { combineString } from "../helpers";
import { DELETE_USER, LOAD_USER_LIST, LOG_OUT } from '../store/actions.type';

const withPrefix = (prefix: string) => (args: string) => combineString(prefix, args);
const withUserPrefix = withPrefix('users');
const withBasePrefix = withPrefix('base');

const store = useStore();
const router = useRouter();
const users = computed(() => store.getters[withUserPrefix('users')]);
const currentUser = computed(() => store.getters[withBasePrefix('currentUser')]);

const loadUserList = () => store.dispatch(withUserPrefix(LOAD_USER_LIST));
const deleteUser = (id: number) => store.dispatch(withUserPrefix(DELETE_USER), id);
const logout = () => store.dispatch(withBasePrefix(LOG_OUT));

const onEdit = (id: number) => {
	router.push({ name: 'users', params: { id } });
};

const onAdd = () => {
	router.push({ name: 'users', params: { id: 'new' } });
};
const onDelete = (id: number) => {
	deleteUser(id);
};

watch(currentUser, () => {
	if (!currentUser.value) {
		router.go(0);
	}
});

onMounted(async () => {
	await loadUserList();
});

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
