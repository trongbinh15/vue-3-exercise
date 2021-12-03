<template>
  <div class="group">
    <input type="checkbox" :id="id" v-model="isDone" />
    <label :for="id" :class="{ 'is-done': isDone }">{{ name }}</label>
    <div class="actions">
      <button @click="edit">Edit</button>
      <button @click="remove">Delete</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
type ItemProps = {
  id: string;
  name: string;
  done: boolean;
};
const props = defineProps<ItemProps>();
const emit = defineEmits(["edit", "remove"]);

const isDone = ref(props.done);

function remove() {
  emit("remove", { id: props.id });
}

function edit() {
  const newValue = prompt("New value", props.name);
  emit("edit", { id: props.id, newValue });
}
</script>
<style scoped lang="scss">
.group {
  padding: 8px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .actions {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    opacity: 0;
    transition: opacity 0.2s;
    button {
      padding: 0 2px;
      margin-right: 4px;
    }
  }
  &:hover {
    .actions {
      opacity: 1;
    }
  }
}
.is-done {
  text-decoration: line-through;
}
</style>
