<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStoreData, initDb, Stores, User } from "@/db/users";
import { onMounted, ref } from "vue";

let users = ref<User[]>([]);

onMounted(async () => {
  await initDb();
  users.value = await getStoreData<User>(Stores.Users);
});
</script>

<template>
  <article class="px-8">
    <Table>
      <TableCaption
        >Here are all the users stored in the IndexedDB in your
        browser.</TableCaption
      >
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in users">
          <TableCell class="font-medium">
            {{ user.name }}
          </TableCell>
          <TableCell>
            {{ user.email }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </article>
</template>
