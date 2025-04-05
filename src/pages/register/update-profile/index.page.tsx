import { Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowCircleRight } from "@phosphor-icons/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";

const updateProfileFormSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileFormSchema),
  });

  const session = useSession();

  console.log(session);

  async function handleUpdateProfile(data: UpdateProfileData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
        </label>

        <label>
          <Text size="sm">Sobre você</Text>

          <TextArea {...register("bio")} />
          <FormAnnotation size={"sm"}>
            Fale um pouco sobre você. Isto será exibido na sua página de perfil.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowCircleRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}
