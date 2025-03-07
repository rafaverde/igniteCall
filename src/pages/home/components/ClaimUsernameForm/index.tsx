import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Nome do usuário dever ter mais de 3 letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Nome do usuário só pode conter letras e hifens.",
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username);
  }

  return (
    <>
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
      <FormAnnotation>
        <Text size={"sm"}>
          {errors.username
            ? errors.username?.message
            : "Digite o nome do usuário desejado."}
        </Text>
      </FormAnnotation>
    </>
  );
}
