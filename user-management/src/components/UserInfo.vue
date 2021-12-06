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
<script>
import { mapActions, mapGetters } from 'vuex'
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { ADD_NEW_USER, UPDATE_USER } from '../store/actions.type';
export default {
    setup() {
        const schema = yup.object().shape({
            name: yup.string().min(3, 'Name must be at least 3 characters'),
            phone: yup.string().required('Phone is required'),
            email: yup.string().required('Email is required').email('Email is invalid'),
        });
        const { meta, errors } = useForm({
            validationSchema: schema,
        });

        const { value: name } = useField('name');
        const { value: phone } = useField('phone');
        const { value: email } = useField('email');

        return {
            name,
            phone,
            email,
            meta,
            errors
        }
    },
    computed: {
        ...mapGetters(['userById']),
        user() {
            return this.userById(this.$route.params.id)
        },
        isNew() {
            return this.$route.params.id === 'new'
        }
    },
    methods: {
        ...mapActions({
            updateUser: UPDATE_USER,
            createUser: ADD_NEW_USER
        }),
        async onSubmit() {
            if (!this.meta.valid) return;
            if (this.isNew) {
                await this.createUser({
                    id: uuid(),
                    name: this.name,
                    phone: this.phone,
                    email: this.email
                });
            } else if (!this.isNew) {
                await this.updateUser({
                    id: this.$route.params.id,
                    name: this.name,
                    phone: this.phone,
                    email: this.email
                })
            }
        },
        onBack() {
            this.$router.go(-1);
        }
    },
    created() {
        if (this.user) {
            this.name = this.user.name;
            this.phone = this.user.phone;
            this.email = this.user.email;
        }
    },
    beforeRouteLeave(to, from, next) {
        //confirm 
        next();
    }

}
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
