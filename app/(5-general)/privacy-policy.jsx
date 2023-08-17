import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

import { Header } from "../../components";
import {
  Container,
  SectionTitle,
  SectionText,
  Separator,
} from "./PrivacyPolicyScreenStyles";

function PrivacyPolicyScreen(props) {
  const { getLocaleString, currentLocale } = useLocalization();

  function renderBRContent() {
    return (
      <ScrollView>
        <Separator />
        <SectionTitle>
          SEÇÃO #1 - O QUE FAREMOS COM ESTA INFORMAÇÃO?
        </SectionTitle>
        <Separator />
        <SectionText>
          Quando você acessa nosso app, coletamos as informações pessoais que
          você nos dá tais como: nome e e-mail, digitados por você ou coletados
          de seus logins sociais. Também recebemos automaticamente o protocolo
          de internet do seu computador, endereço de IP, a fim de obter
          informações que nos ajudam a aprender sobre seu smartphone e sistema
          operacional.
        </SectionText>
        <Separator />
        <SectionText>
          A cada acesso podemos coletar informações que nos auxiliarão nas
          estatísticas de uso do nosso app: geolocalização, datas e horários em
          que você está acessando.
        </SectionText>
        <Separator />
        <SectionText>
          Não coletamos as informações utilizadas nos formulários, sendo elas
          apenas armazenadas em nossos servidores e de acesso exclusivo do
          usuário ao utilizar o app.
        </SectionText>
        <Separator />
        <SectionText>
          O envio de email marketing será realizado até que você não permita
          mais seu envio. Nestes emails você poderá receber notícia sobre nosso
          app, novos produtos e outras atualizações.
        </SectionText>
        <Separator />
        <SectionTitle>SEÇÃO #2 - CONSENTIMENTO</SectionTitle>
        <Separator />
        <SectionText>Como vocês obtêm meu consentimento?</SectionText>
        <Separator />
        <SectionText>
          Quando você fornece informações pessoais como nome e email, para fazer
          seu acesso ao app. Após a realização dessa ação, entendemos que você
          está de acordo com a coleta de dados para serem utilizados pela nossa
          empresa.Quando você fornece informações pessoais como nome e email,
          para fazer seu acesso ao app. Após a realização dessa ação, entendemos
          que você está de acordo com a coleta de dados para serem utilizados
          pela nossa empresa.
        </SectionText>
        <Separator />
        <SectionText>
          Se pedimos por suas informações pessoais por uma razão secundária,
          como marketing, vamos lhe pedir diretamente por seu consentimento, ou
          lhe fornecer a oportunidade de dizer não.
        </SectionText>
        <Separator />
        <SectionText>
          E caso você queira retirar seu consentimento, como proceder?
        </SectionText>
        <Separator />
        <SectionText>
          Se após você nos fornecer seus dados, você mudar de ideia, você pode
          retirar o seu consentimento para que possamos entrar em contato, para
          a coleção de dados contínua, uso ou divulgação de suas informações, a
          qualquer momento, entrando em contato conosco em n​
          egotiation7app@gmail.com​ ou nos enviando uma correspondência em: G​
          C-5 Soluções Corporativas​ ​Av. Tim Lopes 255, 209 bloco 6 - Rio de
          Janeiro- RJ, 22640-105
        </SectionText>
        <Separator />
        <SectionTitle>SEÇÃO #3 - DIVULGAÇÃO</SectionTitle>
        <Separator />
        <SectionText>
          Podemos divulgar suas informações pessoais caso sejamos obrigados pela
          lei para fazê-lo ou se você violar nossos Termos de Serviço.
        </SectionText>
        <Separator />
        <SectionTitle>SEÇÃO #4 - SERVIÇOS DE TERCEIROS</SectionTitle>
        <Separator />
        <SectionText>
          No geral, os fornecedores terceirizados usados por nós irão apenas
          coletar, usar e divulgar suas informações na medida do necessário para
          permitir que eles realizem os serviços que eles nos fornecem.
        </SectionText>
        <Separator />
        <SectionText>
          Entretanto, certos fornecedores de serviços terceirizados, tais como
          gateways de pagamento e outros processadores de transação de
          pagamento, têm suas próprias políticas de privacidade com respeito à
          informação que somos obrigados a fornecer para eles de suas transações
          relacionadas com compras.
        </SectionText>
        <Separator />
        <SectionText>
          Para esses fornecedores, recomendamos que você leia suas políticas de
          privacidade para que você possa entender a maneira na qual suas
          informações pessoais serão usadas por esses fornecedores.
        </SectionText>
        <Separator />
        <SectionText>
          Em particular, lembre-se que certos fornecedores podem ser localizados
          em ou possuir instalações que são localizadas em jurisdições
          diferentes que você ou nós. Assim, se você quer continuar com uma
          transação que envolve os serviços de um fornecedor de serviço
          terceirizado, então suas informações podem tornar-se sujeitas às leis
          da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas
          instalações estão localizados.
        </SectionText>
        <Separator />
        <SectionText>
          Como um exemplo, se você está localizado no Canadá e seu acesso é
          processado por um gateway de pagamento localizado nos Estados Unidos,
          então suas informações pessoais usadas para completar aquela transação
          podem estar sujeitas a divulgação sob a legislação dos Estados Unidos,
          incluindo o Ato Patriota.
        </SectionText>
        <Separator />
        <SectionText>
          Uma vez que você deixe o nosso app, você não será mais regido por essa
          Política de Privacidade ou pelos Termos de Serviço do nosso site.
        </SectionText>
        <Separator />
        <SectionText>Links</SectionText>
        <Separator />
        <SectionText>
          Quando você clica em links no nosso app, eles podem lhe direcionar
          para fora do nosso app. Não somos responsáveis pelas práticas de
          privacidade de outros sites e lhe incentivamos a ler as declarações de
          privacidade deles.
        </SectionText>
        <Separator />
        <SectionTitle>SEÇÃO #5 - SEGURANÇA</SectionTitle>
        <Separator />
        <SectionText>
          Para proteger suas informações pessoais, tomamos precauções razoáveis
          e seguimos as melhores práticas da indústria para nos certificar que
          elas não serão perdidas inadequadamente, usurpadas, acessadas,
          divulgadas, alteradas ou destruídas.
        </SectionText>
        <Separator />
        <SectionText>
          No caso das assinaturas, ao fornecer as suas informações de cartão de
          crédito, essa informação é criptografada usando tecnologia "secure
          socket layer" (SSL) e armazenada com uma criptografia AES-256,
          implementados pelas próprias lojas de aplicativos (Apple Store no caso
          da Apple, Google Play no caso da Google). Embora nenhum método de
          transmissão pela Internet ou armazenamento eletrônico é 100% seguro,
          nós seguimos todos os requisitos da PCI-DSS e implementamos padrões
          adicionais geralmente aceitos pela indústria.
        </SectionText>
        <Separator />
        <SectionTitle>
          SEÇÃO #6 - ALTERAÇÕES PARA ESSA POLÍTICA DE PRIVACIDADE
        </SectionTitle>
        <Separator />
        <SectionText>
          Reservamos o direito de modificar essa política de privacidade a
          qualquer momento, então por favor, revise-a com frequência. Alterações
          e esclarecimentos vão surtir efeito imediatamente após sua publicação
          no app. Se fizermos alterações de materiais para essa política, iremos
          notificá-lo aqui que eles foram atualizados, para que você tenha
          ciência sobre quais informações coletamos, como as usamos, e sob que
          circunstâncias, se alguma, usamos e/ou divulgamos elas.
        </SectionText>
        <Separator />
        <SectionText>
          Se nosso app for adquirido ou fundido com outra empresa, suas
          informações podem ser transferidas para os novos proprietários para
          que possamos continuar a vender produtos para você.
        </SectionText>
        <Separator />
      </ScrollView>
    );
  }
  function renderENContent() {
    return (
      <ScrollView>
        <Separator />
        <SectionTitle>
          SECTION #1 - WHAT WILL WE DO WITH THIS INFORMATION?
        </SectionTitle>
        <Separator />
        <SectionText>
          When you access our App, we collect personal information from you,
          such as: name, email address, typed in by you or collected from your
          social logins. We also receive automatically the internet protocol
          from your computer, IP Address, with the purpose of obtaining the
          information that will help us learn about your smartphone and
          operational system.
        </SectionText>
        <Separator />
        <SectionText>
          Each access we may collect information that will help us in the usage
          statistics of our app: Geolocation, date and time that you’re
          accessing.
        </SectionText>
        <Separator />
        <SectionText>
          We do not collect the informations used in forms, being them only
          stored in our servers and with exclusive access by the user when
          utilizing the app.
        </SectionText>
        <Separator />
        <SectionText>
          The sending of marketing email will be done until you do not allow
          it’s sending anymore. In these emails you will be able to receive news
          about the app, new products and new updates.
        </SectionText>
        <Separator />
        <SectionTitle>SECTION #2 - CONSENT</SectionTitle>
        <Separator />
        <SectionText>Como vocês obtêm meu consentimento?</SectionText>
        <Separator />
        <SectionText>
          How do you obtain my consent? When you provide personal information
          such as name and email to access our app. After this action is done,
          we understand that you are in agreement with the collection of data to
          be utilized by our company.
        </SectionText>
        <Separator />
        <SectionText>
          If we require your information for a secondary reason, such as
          marketing, we will ask you directly for your consent, or give you the
          opportunity to say no.
        </SectionText>
        <Separator />
        <SectionText>
          If you want to remove your consent, how would you do?
        </SectionText>
        <Separator />
        <SectionText>
          If you after you provide us your data, if you change your mind, you
          may remove your consent so that we can contact you, for the continuous
          data collection, use or disclosure of your information, at any moment,
          contacting us at negotiation7app@gmail.com or sending us mail at GC-5
          Soluções Corporativas Av. Tim Lopes 255, 209 bloco 6 - Rio de Janeiro-
          RJ, 22640-105
        </SectionText>
        <Separator />
        <SectionTitle>SEÇTION #3 - DISCLOSURE</SectionTitle>
        <Separator />
        <SectionText>
          We may disclose your personal information in case we are mandated by
          the law to do so or if you violate our Terms of Service.
        </SectionText>
        <Separator />
        <SectionTitle>SECTION #4 - THIRD PARTY SERVICES</SectionTitle>
        <Separator />
        <SectionText>
          In general, our third party providers will only collect, use and
          disclose your information at the necessary rate to perform the
          services that they provide us.
        </SectionText>
        <Separator />
        <SectionText>
          However, certain services from third party providers, such as payment
          gateways and other payment transaction processors, have their own
          privacy policies with the information that we are required to provide
          them about your transactions related to your purchases.
        </SectionText>
        <Separator />
        <SectionText>
          To these providers, we recommend that you read their own privacy
          policies so that you can better understand the way your personal
          information will be used by these providers.
        </SectionText>
        <Separator />
        <SectionText>
          In particular, remember that certain providers may be located in
          different jurisdictions than you or us. If you want to continue the
          transaction that involve the services of a third party provider, your
          information can be subjected to the laws of the jurisdiction(s) in
          which the service provider or their installations are located.
        </SectionText>
        <Separator />
        <SectionText>
          As an example, if you located in Canada and your access is processed
          by a payment gateway located in the United States of the America, then
          your personal information used to complete that transaction could be
          subject to disclosure under the United States of America’s
          legislation, including the Patriot Act.
        </SectionText>
        <Separator />
        <SectionText>
          Once you leave our app, you will not be ruled by this Privacy Policy
          or the Terms of Service from our site.
        </SectionText>
        <Separator />
        <SectionText>Links</SectionText>
        <Separator />
        <SectionText>
          When you click on links in our app, they can direct you to outside of
          our app. We are not responsible for the privacy practices of other
          sites and we encourage you to read their privacy declarations.
        </SectionText>
        <Separator />
        <SectionTitle>SECTION #5 - SECURITY</SectionTitle>
        <Separator />
        <SectionText>
          To protect your personal information, we take reasonable precautions
          and follow industry best practices to make sure they are not lost
          improperly by misuse, accessed, disclosed, altered or destroyed.
        </SectionText>
        <Separator />
        <SectionText>
          In the case of subscriptions, when providing your credit card
          information, this information is encrypted using "secure socket layer"
          (SSL) technology and stored with AES-256 encryption, implemented by
          applications (Apple Store in the case of Apple, Google Play in the
          case of Google). Although no method of transmission over the Internet
          or electronic storage is 100% secure, we follow all PCI-DSS
          requirements and implement standards generally accepted by the
          industry.
        </SectionText>
        <Separator />
        <SectionTitle>
          SECTION #6 - CHANGES FOR THIS PRIVACY POLICY
        </SectionTitle>
        <Separator />
        <SectionText>
          We reserve the right to modify this privacy policy in any moment, so
          please review it frequently. Changes and clarifications will take
          effect immediately after its publication in the app. If we make
          material changes to this policy, we will notify you here that hey have
          been updated, so that you understand which information we collected,
          how we used them, and under what circumstances, if any, we use and/or
          disclosed them.
        </SectionText>
        <Separator />
        <SectionText>
          If our app is acquired or merged with another company, your
          information may be transferred to the new owners so that we can
          continue to sell you products.
        </SectionText>
        <Separator />
      </ScrollView>
    );
  }

  const { back } = useRouter();

  return (
    <Container>
      <Header
        title={getLocaleString("privacyHeader")}
        onPressLeft={() => back()}
      />
      {currentLocale == "en" ? renderENContent() : renderBRContent()}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPolicyScreen);
