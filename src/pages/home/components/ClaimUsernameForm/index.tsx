import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./styles";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username);
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size={"sm"}
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register("username")}
      />
      <Button size={"sm"} type="submit">
        Reservar
        <ArrowCircleRight />
      </Button>
    </Form>
  );
}
