import Image from "next/image";

import previewImg from "../../assets/app-preview.png";
import { Container, Hero, Preview } from "./styles";
import { Heading, Text } from "@ignite-ui/react";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={"4xl"}>Agendamento descomplicado</Heading>
        <Text size={"xl"}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImg}
          alt="Calendário simbolizando a aplicação em funcionamento."
          height={400}
          quality={100}
          priority
        ></Image>
      </Preview>
    </Container>
  );
}
