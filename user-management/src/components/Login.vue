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
<script>
import { watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import * as yup from 'yup';
import { LOG_IN, LOG_OUT } from '../store/actions.type';
export default {
    setup() {
        const schema = yup.object().shape({
            email: yup.string().required('Email is required').email('Email is invalid'),
            password: yup.string().required('Password is required'),
        });
        const { meta, errors } = useForm({
            validationSchema: schema,
        });

        const { value: password } = useField('password');
        const { value: email } = useField('email');

        return {
            password,
            email,
            meta,
            errors
        }
    },
    computed:{
        ...mapGetters(['currentUser'])
    },
    methods: {
        ...mapActions({
            login: LOG_IN,
            logout: LOG_OUT
        }),
        async onLogin() {
            await this.login(this.email);
        }
    },
    watch: {
        currentUser(newUser, oldUser) {
            if(newUser){
                this.$router.push('/');
            }
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