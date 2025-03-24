import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { Container, Header } from "../styles";
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";
import { ArrowCircleRight } from "@phosphor-icons/react";

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-Feira</Text>
            </IntervalDay>
            <IntervalInputs>
              {/* @ts-expect-error */}
              <TextInput size="sm" type="time" step={60} />
              {/* @ts-expect-error */}
              <TextInput size="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-Feira</Text>
            </IntervalDay>
            <IntervalInputs>
              {/* @ts-expect-error */}
              <TextInput size="sm" type="time" step={60} />
              {/* @ts-expect-error */}
              <TextInput size="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowCircleRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
