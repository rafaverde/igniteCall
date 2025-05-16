import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Digite um email válido." }),
  observations: z.string().nullable(),
});

type confirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  function handleConfirmScheduling(data: confirmFormData) {
    console.log(data);
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          12 de maio de 2025
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        {/* @ts-expect-error */}
        <TextInput type="text" placeholder="Seu nome" {...register("name")} />
        {errors.name && (
          <FormError size={"sm"}>{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        {/* @ts-expect-error */}
        <TextInput
          type="email"
          placeholder="Seu e-mail"
          {...register("email")}
        />
        {errors.email && (
          <FormError size={"sm"}>{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("observations")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
