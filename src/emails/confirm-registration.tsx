import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

type RegistrationConfirmEmailProps = {
  username: string
  confirmationToken: string
}

export const RegistrationConfirmEmail = ({
  username,
  confirmationToken,
}: RegistrationConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>The sales intelligence platform that helps you uncover qualified leads.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="/static/next.svg" width="170" height="50" alt="Next" style={logo} />
        <Text style={paragraph}>Witaj {username},</Text>
        <Text style={paragraph}>
          Konto zostało utworzeone, lecz nie jest jeszcze aktywne. Aby je aktywować, kliknij w
          poniższy link:
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href="https://getkoala.com">
            Aktywuj konto
          </Button>
        </Section>
        <Text style={paragraph}>
          Jeżeli przycisk nie przekierował Cię automatycznie, skopiuj i wklej poniższy link do
          przeglądarki:
        </Text>
        <Link href="https://getkoala.com">{confirmationToken}</Link>
        <Text style={paragraph}>
          Życzymy miłej gry
          <br />
          Cash Dynasty Team
        </Text>
        <Hr style={hr} />
        {/*<Text style={footer}>408 Warren Rd - San Mateo, CA 94402</Text>*/}
      </Container>
    </Body>
  </Html>
)

export default RegistrationConfirmEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

// const footer = {
//   color: '#8898aa',
//   fontSize: '12px',
// }
