<template>
    <h1>Login</h1>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                    <span class="error">{{ errors.email }}</span>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
                    <span class="error">{{ errors.password }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-btn @click="onLogin" :disabled="!meta.valid" class="mx-2" color="primary">Login</v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>
<script lang="ts">
import { useField, useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { combineString } from '../helpers';
import { LOG_IN } from '../store/actions.type';

const withPrefix = (args: string) => combineString('base', args);
export default {
    setup() {
        const { meta, errors } = useForm();
        const store = useStore();
        const router = useRouter();

        const { value: password } = useField('password', yup.string().required('Password is required'));
        const { value: email } = useField('email', yup.string().required('Email is required').email('Email is invalid'));
        const currentUser = computed(() => store.getters[withPrefix('currentUser')] );
        const login = (email: string) => store.dispatch(withPrefix(LOG_IN), email);
        const onLogin = async () => {
            if (meta.value.valid) {
            await login(email.value as string);
            }
        };

        watch(currentUser, (newValue) => {
            if(newValue){
                router.push('/');
            }
        });

        return {
            password,
            email,
            meta,
            errors,
            onLogin,
        }
    },
}
</script>
<style scoped>
.error {
    color: red;
    font-size: smaller;
    font-style: italic;
}
</style>