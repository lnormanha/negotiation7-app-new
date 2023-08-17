import React from "react";
import { ScrollView } from "react-native";
import { Header } from "../../components";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

// Styles
import {
  Container,
  SectionTitle,
  SectionText,
  Separator,
} from "./TermsScreenStyles";

export default function TermsScreen() {
  const { getLocaleString, currentLocale } = useLocalization();

  function renderBRContent() {
    return (
      <ScrollView>
        <Separator />
        <SectionText>
          ESTE É UM CONTRATO ENTRE VOCÊ, OU A ENTIDADE QUE VOCÊ REPRESENTA
          (doravante denominado “Você” ou “Seu”) E A GC-5 SOLUÇÕES CORPORATIVAS
          (doravante denominada “App”) REGENDO SEU USO DO APP NEGOTIATION 7.
        </SectionText>
        <Separator />
        <SectionTitle>Partes deste contrato</SectionTitle>
        <Separator />
        <SectionText>
          Este Contrato consiste dos seguintes termos e condições (doravante
          denominados os "Termos Gerais") e dos termos e condições, se
          existirem, específicos ao uso de Serviços individuais (doravante
          denominados "Termos Específicos de Serviço"). Os Termos Gerais e os
          Termos Específicos de Serviço são coletivamente denominados “Termos”.
          No caso de um conflito entre os Termos Gerais e os Termos Específicos
          de Serviço, deverão prevalecer os Termos Específicos de Serviço.
        </SectionText>
        <Separator />
        <SectionTitle>Aceitação dos Termos</SectionTitle>
        <Separator />
        <SectionText>
          Você precisa ter idade legal para firmar um contrato vinculativo para
          aceitação dos Termos. Se você não concordar com os Termos Gerais, não
          use nenhum dos nossos Serviços. Se você concordar com os Termos Gerais
          e não concordar com algum dos Termos Específicos de Serviço, não use o
          Serviço correspondente. Você pode aceitar os Termos marcando uma caixa
          de seleção ou clicando em um botão que indica a sua aceitação dos
          termos ou apenas usando os Serviços.
        </SectionText>
        <Separator />
        <SectionTitle>Descrição do Serviço</SectionTitle>
        <Separator />
        <SectionText>
          Nós oferecemos serviço para gerenciamento de formulários de negociação
          baseada na técnica Negotiation 7 através do App. Você pode usar os
          Serviços para uso pessoal e empresarial, ou para fins empresariais
          internos na organização que você representa. Você pode conectar-se aos
          Serviços usando qualquer navegador de Internet compatível com os
          Serviços. Você é responsável por obter acesso à Internet e pelo
          equipamento necessário para usar os Serviços. Você pode criar e editar
          formulários com sua conta de usuário e, se optar por fazê-lo, pode
          publicar e compartilhar esse conteúdo.
        </SectionText>
        <Separator />
        <SectionTitle>Modificação dos Termos de Serviço</SectionTitle>
        <Separator />
        <SectionText>
          Nós podemos modificar os Termos mediante notificação a qualquer
          momento através de um anúncio de serviço ou enviando um e-mail para
          seu endereço de e-mail principal. Se fizermos alterações
          significativas nos Termos que afetem seus direitos, você receberá uma
          notificação com pelo menos 30 dias de antecedência por e-mail, no seu
          endereço de e-mail primário. Você pode encerrar seu uso dos Serviços
          notificando o App por e-mail dentro de 30 dias após receber a
          notificação de disponibilidade dos Termos modificados, se os Termos
          forem modificados de maneira que afete significativamente seus
          direitos relacionados ao uso dos Serviços. No caso de tal
          encerramento, você não terá o direito a um reembolso proporcional da
          parte não utilizada de quaisquer taxas pagas, sendo que o seu uso
          sempre ocorrerá até o fim do ciclo de assinatura. Seu uso continuado
          do App após a data efetiva de qualquer alteração à Declaração de
          Política de Privacidade será considerado como sua aceitação da
          Declaração de Política de Privacidade modificada.
        </SectionText>
        <Separator />
        <SectionTitle>Obrigações de inscrição do usuário</SectionTitle>
        <Separator />
        <SectionText>
          Você precisa registrar uma conta de usuário, fornecendo todas as
          informações requeridas, para acessar ou usar os Serviços. Se você
          representa uma organização e deseja usar os Serviços para uso interno
          corporativo, nós recomendamos que você e todos os outros usuários da
          sua organização registrem contas de usuário fornecendo suas
          informações de contato corporativas. Nós recomendamos que você use seu
          endereço de e-mail corporativo. Você concorda em: a) fornecer
          informações verdadeiras, precisas, atualizadas e completas sobre você
          conforme solicitado pelo processo de registro; e b) manter e atualizar
          imediatamente as informações fornecidas durante o registro para
          mantê-las verdadeiras, precisas, atualizadas e completas. Se você
          fornecer qualquer informação falsa, imprecisa, desatualizada ou
          incompleta, ou se o App tiver motivos razoáveis para suspeitar que
          essas informações são falsas, imprecisas, desatualizadas ou
          incompletas, o App pode encerrar sua conta de usuário e recusar o uso
          atual e futuro de todo e qualquer Serviço.
        </SectionText>
        <Separator />
        <SectionTitle>Comunicações da App</SectionTitle>
        <Separator />
        <SectionText>
          O Serviço pode incluir certas comunicações da App, como anúncios de
          serviço, mensagens administrativas e informativos. Você compreende que
          essas comunicações deverão ser consideradas parte do uso dos Serviços.
          Como parte da nossa política de fornecer a você privacidade total,
          também proporcionamos a opção de decidir não receber nossos
          informativos. Entretanto, você não será capaz de decidir não receber
          anúncios de serviço e mensagens administrativas.
        </SectionText>
        <Separator />
        <SectionTitle>Taxas e pagamentos</SectionTitle>
        <Separator />
        <SectionText>
          Os Serviços são disponibilizados em planos de assinatura de durações
          variadas. Os pagamentos por planos de assinatura só podem ser feitos
          por cartão de crédito. Sua assinatura será renovada automaticamente ao
          fim de cada período de assinatura, a menos que você faça downgrade do
          seu plano de assinatura paga para um plano gratuito ou nos informe de
          que não deseja renovar a assinatura. No momento da renovação
          automática, a taxa de assinatura será cobrada do cartão de crédito
          usado por você na última vez. Nós fornecemos a você a opção de alterar
          os detalhes, caso você deseje que o pagamento da renovação seja feito
          em um cartão de crédito diferente. Se você não quiser renovar a
          assinatura, deverá nós informar pelo menos sete dias antes da data de
          renovação. Se você não tiver feito downgrade para um plano gratuito e
          se não tiver nos informado que não deseja renovar a assinatura,
          presumiremos que você autorizou o App a cobrar a taxa de assinatura no
          cartão de crédito usado na última vez.
        </SectionText>
        <Separator />
        <SectionText>
          De tempos em tempos, podemos alterar o preço de qualquer Serviço ou
          cobrar pelo uso de Serviços que atualmente sejam gratuitos. Qualquer
          aumento nas cobranças não se aplicará até o vencimento do seu ciclo de
          cobrança atual. Você não será cobrado pelo uso de qualquer Serviço a
          menos que você tenha optado por um plano de assinatura pago.
        </SectionText>
        <Separator />
        <SectionTitle>Envio de spam e atividades ilegais</SectionTitle>
        <Separator />
        <SectionText>
          Você concorda em ser o único responsável pelo conteúdo das suas
          transmissões por meio dos Serviços. Você concorda em não usar os
          Serviços para fins ilegais ou para transmissão de material que seja
          ilegal, difamatório, assediante, caluniante, invasivo da privacidade
          de outros, abusivo, ameaçador, danoso, vulgar, pornográfico, obsceno
          ou que seja objetável, ofenda sentimentos religiosos, promova racismo,
          contenha vírus ou código malicioso, ou que infrinja ou possa infringir
          quaisquer direitos de propriedade intelectual ou outros direitos de
          terceiros.
        </SectionText>
        <Separator />
        <SectionText>
          Reservamo-nos o direito de encerrar seu acesso aos Serviços se houver
          motivos razoáveis para crer que você usou os Serviços para qualquer
          atividade ilegal ou não autorizada.
        </SectionText>
        <Separator />
        <SectionTitle>Política de contas de usuário inativas</SectionTitle>
        <Separator />
        <SectionText>
          Reservamo-nos o direito de excluir informações de contas de usuário
          não pagas que estejam inativas por um período contínuo de 120 dias. No
          caso de tal encerramento, todos os dados associados com essa conta de
          usuário serão excluídos. Nós forneceremos aviso prévio desse
          encerramento e a opção de fazer backup dos seus dados. A política de
          exclusão de dados é em relação a todos Serviços.
        </SectionText>
        <Separator />
        <SectionTitle>Propriedade de dados</SectionTitle>
        <Separator />
        <SectionText>
          Respeitamos o seu direito à propriedade do conteúdo criado ou
          armazenado por você. Você é o proprietário do conteúdo criado ou
          armazenado por você. A menos que especificamente permitido por você,
          seu uso dos Serviços não concede ao App a licença para usar,
          reproduzir, adaptar, modificar, publicar ou distribuir o conteúdo
          criado por você ou armazenado na sua conta de usuário para finalidade
          comercial, de marketing ou qualquer finalidade similar. Mas você
          concede à App permissão para acessar, copiar, distribuir, armazenar,
          transmitir, reformatar, exibir publicamente e apresentar publicamente
          o conteúdo da sua conta de usuário somente conforme exigido para a
          finalidade de fornecer os Serviços a você.
        </SectionText>
        <Separator />
        <SectionTitle>Conteúdo gerado por usuários</SectionTitle>
        <Separator />
        <SectionText>
          Você pode transmitir ou publicar conteúdo criado por você usando
          qualquer um dos Serviços. Entretanto, você será o único responsável
          por esse conteúdo e pelas consequências de sua transmissão ou
          publicação. Qualquer conteúdo tornado público ficará acessível
          publicamente pela internet e pode ser localizado e indexado por
          mecanismos de busca. Você é responsável por assegurar que não
          disponibilizará publicamente qualquer conteúdo particular por
          acidente. Qualquer conteúdo que você possa receber de outros usuários
          dos Serviços é fornecido a você NA FORMA EM QUE SE ENCONTRA apenas
          para sua informação e uso pessoal e você concorda em não usar, copiar,
          reproduzir, distribuir, transmitir, exibir, vender, licenciar ou
          explorar de outra forma esse conteúdo, para qualquer finalidade, sem
          consentimento expresso por escrito da pessoa que detém a propriedade
          dos direitos desse conteúdo. Durante o uso de qualquer um dos
          Serviços, se você se deparar com algum conteúdo com aviso de direitos
          autorais ou qualquer recurso de proteção contra cópia, você concorda
          em não remover tal aviso de direitos autorais ou desativar tal recurso
          de proteção contra cópia. Ao disponibilizar qualquer conteúdo
          protegido por direitos autorais em qualquer um dos Serviços, você
          afirma que tem o consentimento, autorização ou permissão de cada uma
          das pessoas que possam reivindicar quaisquer direitos sobre esse
          conteúdo para disponibilização dessa forma. Além disso, ao
          disponibilizar qualquer conteúdo na forma supracitada, você concorda
          expressamente que o App terá o direito de bloquear o acesso ou remover
          esse conteúdo disponibilizado por você se receber queixas sobre
          qualquer ilegalidade ou violação de direitos de terceiros nesse
          conteúdo. Ao usar qualquer um dos Serviços e transmitir ou publicar
          qualquer conteúdo usando esse Serviço, você consente expressamente a
          determinação de questões de ilegalidade ou violação de direitos de
          terceiros nesse conteúdo pelo agente designado pela App para este fim.
        </SectionText>
        <Separator />
        <SectionText>
          Se você desejar protestar qualquer bloqueio ou remoção de conteúdo
          pelo App, você poderá fazê-lo conforme disposto na nossa Política de
          Privacidade.
        </SectionText>
        <Separator />
        <SectionTitle>Amostras de arquivos e aplicativos</SectionTitle>
        <Separator />
        <SectionText>
          A App pode fornecer amostras de arquivos e aplicativos para a
          finalidade de demonstrar a possibilidade do uso desses Serviços
          efetivamente para fins específicos. As informações contidas nessas
          amostras de arquivos e aplicativos consistem de dados aleatórios. A
          App não faz qualquer garantia, seja ela expressa ou implícita, acerca
          da precisão, utilidade, integralidade ou confiabilidade das
          informações ou amostras de arquivos e aplicativos.
        </SectionText>
        <Separator />
        <SectionTitle>Isenção de responsabilidade de garantias</SectionTitle>
        <Separator />
        <SectionText>
          Você compreende expressamente e concorda que o uso dos serviços é
          feito a seu próprio risco. os serviços são fornecidos "no estado em
          que se encontram" e "conforme a disponibilidade". O app isenta-se
          expressamente de todas as garantias de qualquer tipo, expressas ou
          implícitas, incluindo, mas não limitadas às garantias implícitas de
          garantia de mercado e aptidão para um fim específico. O app não
          garante que os serviços serão ininterruptos, pontuais, seguros ou
          livres de erro. O uso de qualquer material baixado ou obtido por meio
          do uso dos serviços deverá ser feito a seu exclusivo critério e risco
          e você será o único responsável por qualquer dano ao seu computador,
          telefone móvel, dispositivo sem fio ou dados que resulte do uso dos
          serviços ou do download de qualquer material desse tipo. Nenhum
          conselho ou informação, seja verbal ou por escrito, obtido por você
          junto o app, seus funcionários ou representantes criará qualquer
          garantia não declarada expressamente nestes termos.
        </SectionText>
        <Separator />
        <SectionTitle>Limitação de responsabilidade</SectionTitle>
        <Separator />
        <SectionText>
          Você concorda que o App não deverá ser responsabilizado, em qualquer
          caso, por qualquer dano ou perda consequente, incidental, indireto,
          especial, punitivo ou qualquer outro dano ou perda, ou pela perda de
          lucros, interrupção de negócios, falha de computador, perda de
          informações comerciais ou outra perda resultante ou causada pelo uso
          ou incapacidade de usar o serviço, mesmo que o App tenha sido avisado
          sobre a possibilidade desses danos. A responsabilidade da app para com
          você relacionada a qualquer serviço, direto ou indireto, não deverá
          exceder as taxas pagas por você pela contratação desse serviço.
        </SectionText>
        <Separator />
        <SectionTitle>Indenização</SectionTitle>
        <Separator />
        <SectionText>
          Você concorda em indenizar e isentar o App, seus agentes, diretores,
          funcionários, fornecedores e afiliadas de e contra quaisquer perdas,
          danos, multas e despesas (incluindo honorários e custos advocatícios)
          decorrentes ou relacionados a qualquer reivindicação de que você tenha
          usado os Serviços em violação dos direitos de qualquer terceira parte,
          em violação de qualquer lei, em violação de quaisquer disposições dos
          Termos, ou qualquer outra reivindicação relacionada ao seu uso dos
          Serviços, exceto quando esse uso for autorizado pelo App.
        </SectionText>
        <Separator />
        <SectionTitle>Suspensão e encerramento</SectionTitle>
        <Separator />
        <SectionText>
          Nós podemos suspender sua conta de usuário ou desativar
          temporariamente o acesso à integralidade ou a parte de qualquer
          Serviço no caso de qualquer suspeita de atividade ilegal, períodos
          extensos de inatividade ou solicitações de agências de aplicação da
          lei ou outras agências governamentais. Objeções à suspensão ou
          desativação de contas de usuário devem ser enviadas para
          negotiation7app@gmail.com dentro de trinta dia após o recebimento da
          notificação sobre a suspensão. Nós podemos encerrar uma conta de
          usuário suspensa ou desativada depois de trinta dias. Nós também
          podemos encerrar sua conta de usuário mediante sua solicitação.
        </SectionText>
        <Separator />
        <SectionText>
          Além disso, reservamo-nos o direito de encerrar sua conta de usuário e
          negar os Serviços mediante crença razoável de que você violou os
          Termos e a encerrar seu acesso a qualquer Serviço Beta no caso de
          problemas técnicos inesperados ou descontinuação do Serviço Beta. Você
          tem o direito de encerrar sua conta de usuário se o App infringir suas
          obrigações sob estes Termos e, nesse caso, você terá direito ao
          reembolso proporcional de quaisquer taxas pagas. O encerramento da
          conta de usuário incluirá a negação de acesso a todos os Serviços,
          exclusão de informações na sua conta de usuário, como seu endereço de
          e-mail e senha, além da exclusão de todos os dados na sua conta de
          usuário.
        </SectionText>
        <Separator />
      </ScrollView>
    );
  }

  function renderENContent() {
    return (
      <ScrollView>
        <Separator />
        <SectionText>
          THIS IS A CONTRACT BETWEEN YOU, OR THE ENTITY YOU REPRESENT
          (henceforth denominating “You” or “Your”) E THE GC-5 CORPORATE
          SOLUTIONS (henceforth denominated “app”) RULING YOUR USAGE OF THE APP
          NEGOTIATION 7.
        </SectionText>
        <Separator />
        <SectionTitle>Parts of this contract</SectionTitle>
        <Separator />
        <SectionText>
          This Contract consists of the following terms and conditions
          (henceforth denominating the “General Terms”) and of the terms and
          conditions, if they exist, specifics to the usage of Individual
          Services (henceforth denominated “Specific Terms of Service”). The
          General Terms and the Specific Terms of Service are collectively
          denominated “Terms”. In the case of a conflict between the General
          Terms and the Specific Terms of Service, Specific Terms of Service
          should prevail.
        </SectionText>
        <Separator />
        <SectionTitle>Acceptance of the Terms</SectionTitle>
        <Separator />
        <SectionText>
          You’re required to be within the legal age to enter a binding contract
          to agree with the Terms. If you DO NOT agree with the General Terms,
          DO NOT use any of our Services. If you agree with the General Terms
          and DO NOT agree with any of the Specific Terms of Service, DO NOT use
          the corresponding Service. You can agree with the Terms by checking a
          box or by clicking in a button that indicates your agreement with the
          terms or just by using the Services.
        </SectionText>
        <Separator />
        <SectionTitle>Description of the Service</SectionTitle>
        <Separator />
        <SectionText>
          We offer services for managing negotiation forms based on the technic
          Negotiation 7 through the App. You may use the Services for personal
          and business purposes, as well as for internal business purposes on
          the organization you represent. You may connect to the Services using
          any internet browser compatible with the Services. You are responsible
          for obtaining access to the Internet and for the necessary equipment
          to use the Services. You may create and edit forms with your user
          account and, if chosen to do so, you may publish said content.
        </SectionText>
        <Separator />
        <SectionTitle>Modifying the Terms of Service</SectionTitle>
        <Separator />
        <SectionText>
          We may modify the Terms upon notification at any moment through a
          service announcement or through email to your primary email. If any
          significant alterations are done to the Terms that affect your rights,
          you will receive a notification with at least 30 days in advance
          through your email, on your primary email. You may end your use of the
          Services notifying the app by email and within 30 days you after
          receiving the notification of the availability of the Terms modified,
          if the Terms are in a way that affects your significantly your rights
          related to the use of the Services. In case of said closure, you will
          not have the right to a proportional refund of the non-utilized part
          of any paid feeds, being that your use will always run until the end
          of the subscription cycle. Your continued usage of the App after the
          effective date of any Privacy Policy Statement will be considered as
          your agree with the modified Privacy Policy Statement.
        </SectionText>
        <Separator />
        <SectionTitle>User subscription obligations</SectionTitle>
        <Separator />
        <SectionText>
          You are need to register an user account providing all required
          information to access or use the Services. If you represent an
          organization and wish to you the Services for internal corporate
          purposes, we recommend that you and all other users of your
          organization register user accounts providing your corporate contact
          information. We recommend that you use your corporate email. You agree
          on: a) Providing real, accurate, updated and complete information
          about you as requested by the registering process; e b) to maintain
          and to keep up-to-date immediately upon change the provided
          information during the register process to keep them real, accurate,
          updated and complete. If you provide any false, inaccurate, outdated
          or incomplete information, or if the App has reasons to suspect that
          any information is false, inaccurate, outdated or incomplete, the App
          may terminate your user account and refuse any present or future use
          of all and any Service.
        </SectionText>
        <Separator />
        <SectionTitle>App communication</SectionTitle>
        <Separator />
        <SectionText>
          The Service can include certain communications from the App, like
          service, administrative and informative announcements. You comprehend
          that these communications must be considered part of the use of the
          Services. As part of our policy of providing you with total privacy,
          we also provide you the option to decide whether or not to receive our
          informative announcements. However, you won’t be able to decided NOT
          to receive service and administrative messages.
        </SectionText>
        <Separator />
        <SectionTitle>Payments and Fees</SectionTitle>
        <Separator />
        <SectionText>
          The Services are available in multiple subscription plans with varied
          durations. The subscription plans’ payments can only be made using
          credit cards. Your subscription will be renewed automatically at the
          end of each subscription period, unless you downgrade your
          subscription plan to a free plan or inform us that you do not wish to
          renew your subscription. At the moment of the automatic renewal, the
          subscription fee will be charged on the last credit card used by you.
          We provide you the option to change the details, if you wish that the
          payment renovation to be made on a different credit card. If you do
          not wish to renovate your subscription, you must inform us at least
          seven days before the renovation date. If you did not downgrade for a
          free subscription plan and did not inform us that you did not want to
          renovate your subscription, we will presume you’ve authorized the App
          to charge the subscription fee on your last used credit card.
        </SectionText>
        <Separator />
        <SectionText>
          From time to time we may change the price of any Service or charge for
          the Services’ usage that are currently free. Any increase on your
          charges will not apply until the end of your current subscription
          cycle.You will not be charged for the use of any Service unless you
          have opted for a paid subscription plan.
        </SectionText>
        <Separator />
        <SectionTitle>Spam and illegal activities</SectionTitle>
        <Separator />
        <SectionText>
          You agree to be the only responsible for the content of your
          transmissions by the means of the Services. You agree in not using the
          Services for illegal activities or for the transmission of materials
          that are illegal, defamatory, harassing, slanderous, invasive,
          abusive, threatening, damaging, vulgar, pornographic, obscene or that
          offend religious feelings, promote racism, contains viruses or
          malicious code, or that infringe or could infringe any intellectual
          property or third party rights.
        </SectionText>
        <Separator />
        <SectionText>
          We reserve the right to terminate your access to the Services if any
          reasonable reason to believe that you have used the Services for any
          illegal or unauthorized activity.
        </SectionText>
        <Separator />
        <SectionTitle>Inactive user accounts policy</SectionTitle>
        <Separator />
        <SectionText>
          We reserve the right to delete information of free user accounts that
          are inactive for a continuous period of 120 days. In the case of said
          termination, all data related to said user account will be deleted. We
          provide a previous warning of said termination and the option to
          backup your data . The data deletion policy is related to all
          Services.
        </SectionText>
        <Separator />
        <SectionTitle>Property of Data</SectionTitle>
        <Separator />
        <SectionText>
          We respect your right of property of content created or stored by you.
          You are the proprietary of the content created or stored by you.
          Unless specifically permitted by you, your usage of the Services do
          not grant the App the license to use, reproduce, adapt, modify,
          publish or distribute the content created by you or stored in your
          user account for commercial, marketing or any similar ends. But if you
          grant the App the permission to access, copy, distribute, store,
          transmit, reformat, display publicly the content of your user account
          only as required for the means of providing you the Services.
        </SectionText>
        <Separator />
        <SectionTitle>User generated content</SectionTitle>
        <Separator />
        <SectionText>
          You can transmit or publish any content created by you using any of
          the Services. However, you are the only responsible for this content
          and for the consequences of the transmission or publishing. Any
          content made public will be accessible publicly on the internet and
          can found and indexed by search mechanisms. You are the responsible
          for ensuring that you will not publish particular content by accident.
          Any content that you might receive from other Services’ users is
          provided AS IS only for your information and personal use and you
          agree to not use, copy, reproduce, distribute, transmit, display,
          sell, license or explore this content in another form for any goal
          without written consent by the person who owns the right of property
          of said content. During the use of any one of the Services, if you
          come across any copyrighted content with a warning or any copy
          protection resource, you agree in not removing said copy protection.
          When providing any copyrighted content in any of the Services, you
          claim that you have the consent, authorization or permission of each
          one of the people that may claim any rights over the content provided
          in this form. Also, when providing content in the aforementioned form,
          you expressly agree that the App will have the right of blocking the
          access or remove this content provided by you if received any form of
          complaint about it’s illegality or violation of third party rights.
          When using any of the Services and transmitting or publishing any
          content using this Service, you consent expressly the determination of
          matters of illegality or the violation of third party rights in this
          content by the agent designated by the App for this purpose.
        </SectionText>
        <Separator />
        <SectionText>
          If you desire to protest any block or removal of content by the app,
          you can do so as provided by our Privacy Policy.
        </SectionText>
        <Separator />
        <SectionTitle>Sample of files and app</SectionTitle>
        <Separator />
        <SectionText>
          The App can provide file and app samples for the purpose of
          demonstrating the possibilities of the usage of these Services
          effectively for specific means. The information contained in the file
          and app samples consist of random data. The App has no warranty, be it
          explicit of implicit, about precision, utility, wholeness or
          reliability of the information or samples of files and apps.
        </SectionText>
        <Separator />
        <SectionTitle>Exemption of responsibility of warranty</SectionTitle>
        <Separator />
        <SectionText>
          You comprehend expressly and agree that the usage of the Services is
          done by your own account and risk. The Services are provided AS IS and
          ACCORDINGLY TO THE AVAILABILITY. The app exempts expressly of all and
          any warranty of any kind, expressed or implicits, including, but not
          limited to the implicit warranty of warranty of market and fitness for
          a specific purpose. The app does not guarantee that the Services will
          be uninterrupted, punctuals, safe or free of errors. The usage of any
          downloaded material or obtained through the use of the Services must
          be done at your exclusive criteria and risk and you will be only
          responsible for any damage to your computer, mobile phone, wireless
          device or data that result from the use of the Services or from the
          download of any material of this type. No advice or information, be it
          verbal or written, acquired by you with the app, your employees or
          representatives, will create any non expressly declared warranty in
          these terms.
        </SectionText>
        <Separator />
        <SectionTitle>Responsibility limitation</SectionTitle>
        <Separator />
        <SectionText>
          You agree that the App should not be responsibilized in any case for
          any consequential, incidental, indirect, special or punitive of any
          loss or damage, or by the loss of profit, interruption of business,
          computer failures, loss of commercial information or any other loss
          resulting or caused by the usage or incapability of usage of the
          Service, even if the App has been warned about the possibility of the
          damages. The responsibility of the App with you when related to any
          Service, direct or indirect, may not exceed the fees paid by your
          contracting of this Service.
        </SectionText>
        <Separator />
        <SectionTitle>Indemnity</SectionTitle>
        <Separator />
        <SectionText>
          You agree in Indemnify and exempt the App, their agents, directors,
          employees, providers and affiliated of and from any loss, damages,
          fines and expenses (including honorary and attorney costs) resulting
          or related to any revindication that you have used the Services in
          violation of the rights of any third party, violation of any law, in
          violation of any disposition of Terms, or any other revindication
          related to the the usage of the Services, except for when this use is
          authorized by the App.
        </SectionText>
        <Separator />
        <SectionTitle>Suspension and termination</SectionTitle>
        <Separator />
        <SectionText>
          We may suspend your user account or deactivate temporarily the access
          to the of wholeness or part of any Service in the case of any
          suspected illegal activity, extended inactivity periods or law
          enforcement or other government agencies’ requests. Objections to the
          suspension or deactivation of user accounts should be sent to
          negotiation7app@gmail.com within thirty days after receiving the
          notification about the suspension. We may terminate a suspended or
          deactivated user account after thirty days. we also may terminate your
          user account upon request.
        </SectionText>
        <Separator />
        <SectionText>
          Besides that, we reserve ourselves the right of terminating your user
          account and deny the Services upon reasonable belief that you violated
          the Terms and terminate your access to any Beta Service in the case of
          unexpected technical problems or discontinuiation of the Beta Service.
          You have the right to end your user account if the App break it’s
          obligations under these Terms and, in this case, you will have the
          right of proportional refund of any paid fee. The termination of the
          user account includes the denying of any access to all the Services,
          deletion of information in your user account, such as your email
          address and password, beyond the deletion of all data in your user
          account.
        </SectionText>
        <Separator />
      </ScrollView>
    );
  }
  const { back } = useRouter();
  return (
    <Container>
      <Header title={getLocaleString("termsHeader")} onPressLeft={back} />
      {currentLocale == "en" ? renderENContent() : renderBRContent()}
    </Container>
  );
}
