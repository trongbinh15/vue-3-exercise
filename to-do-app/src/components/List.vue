<template>
  <div class="container">
    <template v-for="item in data" :key="item.id">
      <Item
        :name="item.name"
        :done="item.done"
        :id="item.id"
        @remove="onRemoveItem"
        @edit="onEditItem"
      />
    </template>
    <div class="add-more" @click="addItem">Add Item</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ItemModel } from "../models/item.model";
import Item from "./Item.vue";
const data = ref<ItemModel[]>([
  { id: "1", name: "Learn Vue", done: false },
  { id: "2", name: "Learn Vuex", done: true },
  { id: "3", name: "Learn Vue Router", done: false },
]);

function onRemoveItem({ id }: { id: string }) {
  const index = data.value.findIndex((item) => item.id === id);
  if (index > -1) {
    data.value.splice(index, 1);
  }
}

function onEditItem({ id, newValue }: { id: string; newValue: string }) {
  const index = data.value.findIndex((item) => item.id === id);
  if (index > -1) {
    data.value[index].name = newValue;
  }
}

function addItem() {
  const name = prompt("Enter item name");
  const model: ItemModel = {
    id: Math.random().toString(),
    name: name || "",
    done: false,
  };

  data.value.push(model);
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}
.add-more {
  margin-top: 8px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  cursor: pointer;
}
</style>
