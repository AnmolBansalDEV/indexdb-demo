<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { toast } from '@/components/ui/toast'
import { addData, initDb, Stores } from "@/db/users";
import { onMounted } from "vue";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await addData(Stores.Users,  values);
    toast({
      title: 'the user is saved in the Indexed DB'
    })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Something went wrong');
      }
    }
})
onMounted(async () => {
  await initDb()
})
</script>

<template>
  <article
    class="flex flex-col px-8 gap-10 justify-center items-center size-full"
  >
    <h1 class="text-3xl text-center">
      Enter the user details to be stored in Indexed DB
    </h1>
    <form class="max-w-52 flex flex-col items-center gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="anmol" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="anmol@gmail.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Submit </Button>
    </form>
  </article>
</template>
