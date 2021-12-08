<template>
    <h1>User info</h1>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="name" label="Name" :counter="10" required></v-text-field>
                    <span class="error">{{ errors.name }}</span>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="phone" label="Phone" required></v-text-field>
                    <span class="error">{{ errors.phone }}</span>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                    <span class="error">{{ errors.email }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-btn @click="onSubmit" :disabled="!meta.valid" class="mx-2" color="primary">Save</v-btn>
                <v-btn @click="onBack">Back</v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>
<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { combineString } from '../helpers';
import { User } from '../models/user.model';
import { ADD_NEW_USER, UPDATE_USER } from '../store/actions.type';

interface FormField {
    email: string;
    phone: string;
    name: string;
}

const withPrefix = (args: string) => combineString('users', args);

const store = useStore();
const route = useRoute();
const router = useRouter();
const { meta, errors } = useForm<FormField>();

const { value: name } = useField('name', yup.string().required('Name is required'));
const { value: phone } = useField('phone', yup.string().required('Phone is required'));
const { value: email } = useField('email', yup.string().required('Email is required').email('Email is invalid'));
const userById = (id: string) => store.getters[withPrefix('userById')](id);

const isNew = computed(() => route.params.id === 'new');
const updateUser = (payload: User) => store.dispatch(withPrefix(UPDATE_USER), payload);
const createUser = (payload: User) => store.dispatch(withPrefix(ADD_NEW_USER), payload);

const onSubmit = async () => {
    if (!meta.value.valid) return;
    if (isNew.value) {
        await createUser({
            id: uuid(),
            name: name.value as string,
            phone: phone.value as string,
            email: email.value as string,
        });
    } else if (!isNew.value) {
        await updateUser({
            id: route.params.id as string,
            name: name.value as string,
            phone: phone.value as string,
            email: email.value as string,
        })
    }
};

const user = computed(() => userById(route.params.id as string));

const onBack = () => {
    router.go(-1);
}

name.value = !isNew.value ? user.value.name : name.value;
phone.value = !isNew.value ? user.value.phone : phone.value;
email.value = !isNew.value ? user.value.email : email.value;

</script>
<style scoped>
h1 {
    padding: 12px;
}
.error {
    color: red;
    font-size: smaller;
    font-style: italic;
}
</style>
