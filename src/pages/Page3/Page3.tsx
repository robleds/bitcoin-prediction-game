import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

import { makeStyles } from '@material-ui/core/styles';
// Firebase
import { getDatabase, ref, set } from 'firebase/database';

import FooterBar from '@/components/FooterBar';
import FormPerson from '@/components/FormPerson';
import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import NavButtons from '@/components/NavButtons';
import RestartTimer from '@/components/RestartTimer';
import TopLogo from '@/components/TopLogo';
import { CenteredFlexBox, FullSizeCenteredFlexBoxBgImage } from '@/components/styled';

import SubmitSound from './assets/register-processing.mp3';

const useStyles = makeStyles({
  container: {
    minWidth: '100hw',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  childContainer: {
    // backgroundColor: '#3540f2',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 70,
  },
  mainText: {
    fontSize: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
  },
  button: {
    width: '100%',
    color: 'white',
    paddingRight: 100,
    paddingLeft: 60,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#3540f2',
  },
  buttonIconArrow: {
    fontSize: 30,
    position: 'absolute',
    right: 20,
    color: 'white',
  },
  buttonIconProcess: {
    fontSize: 30,
    position: 'absolute',
    right: 22,
    color: 'white',
  },
  buttonIconSuccess: {
    fontSize: 30,
    position: 'absolute',
    right: 20,
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 50,
  },
  highlight: {
    color: '#81feef',
    fontWeight: 'bold',
  },
  termsText: {
    paddingTop: 20,
    fontSize: 16,
    color: '#aaa',
    textDecoration: 'underline',
  },
});

const CssNButton = styled(Button)({
  '&:hover': {
    backgroundColor: '#3540ff',
  },
});

interface participation {
  id: string;
  timestemp_start: string;
  timestemp_answer: string;
  timestemp_form: string;
  timestemp_end: string;
  bundle: string;
  btz_value: number;
  name: string;
  email: string;
  phone: string;
  telegram: string;
}

interface MyFormElement {
  name: string;
  email: string;
  phone: string;
  telegram: string;
}

function Page3() {
  const form = useRef<MyFormElement>(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(SubmitSound));
  const [loading, setLoading] = useState(false);
  const [registerSucess, setRegisterSucess] = useState(false);
  const [resetTimmer, setResetTimmer] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    audioRef.current.play();
    const dateNow = new Date();
    const userId = `trsf-${dateNow.getTime()}`;
    const sendName = form?.current?.name || '';
    const sendEmail = form?.current?.email || '';
    const sendPhone = form?.current?.phone || '';
    const sendTelegram = form?.current?.telegram || '';
    const bundleId = 'oba.transfero.websummit.participation';
    const participation: participation = {
      id: userId,
      timestemp_form: dateNow.toISOString(),
      bundle: bundleId,
      btz_value: 0,
      name: sendName,
      email: sendEmail,
      phone: sendPhone,
      telegram: sendTelegram,
      timestemp_start: '',
      timestemp_answer: '',
      timestemp_end: '',
    };
    await writeUserData(participation);
    window.setTimeout(() => {
      setLoading(false);
      setRegisterSucess(true);
      window.setTimeout(() => {
        navigate(`/page-4`);
      }, 1500);
    }, 1800);
  };

  async function writeUserData(request: participation) {
    await localStorage.removeItem(request.bundle);
    const db = await getDatabase();
    const requestId = request.id;
    await set(ref(db, 'transfero2003/' + requestId), request);
    await localStorage.setItem(request.bundle, JSON.stringify(request));
  }

  useEffect(() => {
    setResetTimmer(false);
  }, [openModal]);

  useEffect(() => {
    setTimeout(() => setResetTimmer(true), 200);
  }, [resetTimmer]);

  function handleTextChange() {
    setResetTimmer(false);
  }

  return (
    <>
      <Meta title="Challenge" />
      <FullSizeCenteredFlexBoxBgImage className={classes.container}>
        <TopLogo />
        <HomeButtonDialog needConfirmation={false} />
        <NavButtons left={'/page-2'} right={'/page-4'} />
        <CenteredFlexBox className={classes.childContainer}>
          <Typography className={classes.mainText}>
            Fill out the form to compete for the{' '}
            <span className={classes.highlight}>1000 BRZs</span>.
          </Typography>

          <FormPerson ref={form} onTextChange={handleTextChange} />

          <Box className={classes.buttonContainer}>
            <CssNButton
              onClick={handleSubmit}
              className={classes.button}
              disabled={loading || registerSucess || form?.current?.email === ''}
            >
              <Typography className={classes.buttonText}>{`start`}</Typography>
              {!loading && !registerSucess && (
                <ArrowForwardIcon className={classes.buttonIconArrow} />
              )}
              {registerSucess && <CheckCircleIcon className={classes.buttonIconSuccess} />}
              {loading && <CircularProgress size={25} className={classes.buttonIconProcess} />}
            </CssNButton>
          </Box>
          <Typography className={classes.termsText} onClick={() => setOpenModal(true)}>
            By participating, I declare that I agree with the terms. Open here.
          </Typography>
        </CenteredFlexBox>
        <FooterBar />
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>{'Termos e Condições Gerais'}</Box>
              <CssNButton sx={{ color: 'white' }} onClick={() => setOpenModal(false)}>
                <CloseIcon color="inherit" />
              </CssNButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers={true}>
            <Typography variant="body1">
              <div className="layoutArea">
                <div className="column">
                  <p>
                    <span>
                      <strong>Introdução</strong>
                    </span>
                  </p>
                </div>
              </div>
              <div className="layoutArea">
                <div className="column">
                  <p>
                    <span>O presente Termos e Condições </span>
                    <span>Gerais (&ldquo;Termos e Condições&rdquo;) </span>
                    <span>
                      define os termos e condições do Concurso de Premiação de BRZ Token (o
                      Concurso) promovido pela 3RZ SERVIÇOS DIGITAIS LTDA, sediada na Rua Visconde
                      de Pirajá 250, 8o andar, Ipanema, Rio de Janeiro/RJ, CEP: 22410-000, (a
                      Transfero), com vigência entre os dias 1 e 4 de maio de 2023, que oferecerá
                      aos participantes a oportunidade de ganhar BRZ tokens em sua Plataforma
                      (conforme definido abaixo) com base no preço do Bitcoin às 17h a cada dia do
                      Evento abaixo definido.
                    </span>
                  </p>
                  <p>
                    <span>
                      A adesão ao Concurso pressupõe a leitura completa e integral deste Regulamento
                      e consentimento com todas as suas disposições, bem como da Política de
                      Privacidade parte integrante deste documento.
                    </span>
                  </p>
                  <p>
                    <span>
                      <strong>Evento</strong>
                    </span>
                  </p>
                  <p>
                    <span>A T</span>
                    <span>
                      ransfero participará, de 1 a 4 de maio de 2023, do evento denominado
                      &ldquo;Web Summit Rio&rdquo;, que consiste em{' '}
                    </span>
                    <span>
                      uma conferência anual de tecnologia, empreendedorismo e inovação. O Evento tem
                      como objetivo fornecer um ambiente de networking, apresentações de palestras
                      de renomados palestrantes, painéis de discussão e oportunidades de negócios.
                    </span>
                  </p>
                  <p>
                    <span>
                      <strong>Elegibilidade</strong>
                    </span>
                  </p>
                  <p>
                    <span>
                      O Concurso está aberto a todos os indivíduos que atendam aos seguintes
                      requisitos:
                      <br />
                      (a) tenham idade igual ou superior a 18 anos na data de inscrição;
                      <br />
                      (b) não sejam residentes em países ou regiões onde a oferta ou distribuição de
                      tokens sejam proibidas por lei;
                      <br />
                      (c) tenham uma conta válida e ativa na plataforma da Transfero (
                    </span>
                    <span>https://crypto.transfero.com/</span>
                    <span>) </span>
                    <span>(&ldquo;Plataforma&rdquo;)</span>
                    <span>
                      ; e<br />
                      (d) cumpram todas as outras condições de elegibilidade estabelecidas pela
                      Transfero, assim como estejam de acordo com os Termos de Uso
                      (https://crypto.transfero.com/terms) e Política de Privacidade
                      (https://crypto.transfero.com/lgpd) da Plataforma acima mencionada.
                    </span>
                  </p>
                  <p>
                    <span>
                      <strong>Mecânica do Concurso</strong>
                    </span>
                  </p>
                  <p>
                    <span>
                      (a) Com o Concurso, a Transfero tem por objetivo reconhecer e premiar 1 (um)
                      Participante a cada dia de Evento, totalizando 4 (quatro) vencedores.
                      <br />
                      (b) O Concurso consistirá em uma previsão do preço do Bitcoin em dólares
                      americanos às 17h a cada dia do Evento. Os participantes deverão submeter sua
                      previsão do preço do Bitcoin através do totem da Transfero no stand da empresa
                      no Evento até às 15h de cada dia do Evento.
                    </span>
                  </p>
                  <p>
                    <span>
                      (c) Cada participante poderá enviar apenas uma previsão por dia de Evento.
                      <br />
                      (d) A Transfero determinará o vencedor com base na previsão mais precisa em
                      relação ao preço real do Bitcoin às 17h do dia do Evento.
                      <br />
                      (e) Em caso de empate, a Transfero entregará o prêmio integral para os 2
                      (dois) ou mais participantes que empataram, cada um recebendo 1.000 (mil) BRZ
                      Tokens.
                      <br />
                      (f) O preço real do Bitcoin será verificado com base no site
                      https://cryptowat.ch/pt-br. (h) A Transfero não divulgará as previsões dos
                      participantes publicamente.
                    </span>
                  </p>
                  <p>
                    <span>
                      <strong>Prêmios</strong>
                    </span>
                  </p>
                  <p>
                    <span>
                      (a) A Transfero oferecerá aos participantes vencedores um prêmio em tokens na
                      Plataforma no valor de 1.000 (mil) BRZ.
                    </span>
                  </p>
                  <div className="page" title="Page 2" id="isPasted">
                    <div className="layoutArea">
                      <div className="column">
                        <p>
                          <span>
                            (b) O prêmio será distribuído exclusivamente em BRZ, não cabendo à
                            Transfero a sua troca por dinheiro ou outras formas de remuneração.
                          </span>
                        </p>
                        <p>
                          <span>
                            <strong>Anúncio dos Vencedores</strong>
                          </span>
                        </p>
                        <p>
                          <span>
                            (a) Ao término do Concurso, a Transfero anunciará os vencedores por
                            e-mail. Os participantes vencedores serão notificados através do e-mail
                            fornecido no momento do cadastro dos mesmos na Plataforma. A Transfero
                            enviará um e-mail para cada vencedor verificando a existência da conta e
                            veracidade dos dados informados para a distribuição do prêmio.
                          </span>
                        </p>
                        <p>
                          <span>
                            (b) A Transfero reserva-se o direito de desqualificar qualquer
                            participante que não cumprir os requisitos do Concurso ou que for
                            considerado em violação ao presente Termos e Condições do Concurso.
                            <br />
                            (c) Os prêmios serão distribuídos aos vencedores do Concurso em até 30
                            dias úteis após a confirmação das condições das contas dos vencedores na
                            Plataforma.
                          </span>
                        </p>
                        <p>
                          <span>
                            (d) Caso um vencedor não forneça informações corretas e precisas no
                            cadastro da Plataforma, a Transfero se reserva o direito de
                            desqualificar o participante e selecionar outro vencedor do Concurso.
                            <br />
                            (e) Os participantes concordam que a Transfero não será responsável por
                            quaisquer problemas técnicos ou mal funcionamento que possam ocorrer
                            durante o envio ou recebimento de e-mails relacionados ao Concurso.
                          </span>
                        </p>
                        <p>
                          <span>
                            (f) Os participantes concordam que a decisão da Transfero em relação aos
                            vencedores do Concurso é final e vinculativa.
                          </span>
                        </p>
                        <p>
                          <span>
                            <strong>Cancelamento do Concurso</strong>
                          </span>
                        </p>
                        <p>
                          <span>
                            A Transfero reserva-se o direito de cancelar ou modificar o Concurso a
                            qualquer momento, por qualquer motivo e sem aviso prévio.
                          </span>
                        </p>
                        <p>
                          <span>
                            <strong>Responsabilidade</strong>
                          </span>
                        </p>
                        <p>
                          <span>
                            (a) A Empresa não será responsável por qualquer perda, dano, lesão ou
                            prejuízo decorrente da participação no Concurso.
                            <br />
                            (b) Os participantes concordam em isentar a Empresa, seus funcionários,
                            diretores, afiliados, agentes e representantes de qualquer
                            responsabilidade por qualquer reclamação, ação, demanda ou processo
                            movido por qualquer terceiro em relação ao Concurso.
                          </span>
                        </p>
                        <p>
                          <span>
                            <strong>Disposições Gerais</strong>
                          </span>
                        </p>
                        <p>
                          <span>
                            A adesão ao Concurso implica na aceitação total das condições descritas
                            neste Termos e Condições por livre consentimento do Participante.
                          </span>
                        </p>
                        <p>
                          <span>
                            Os BRZ Tokens creditados ao Participante não poderão ser convertidas em
                            dinheiro ou valores de qualquer outra espécie, as quais possuem caráter
                            pessoal, inegociável e intransferível, sendo vedada qualquer forma de
                            cessão ou transferência pelo Participante, a qualquer tempo e título, a
                            terceiros, sucessores ou herdeiros.
                          </span>
                        </p>
                        <p>
                          <span>
                            A Transfero reserva-se ao direito de alterar, suspender ou mesmo
                            encerrar o Concurso e/ou seu Regulamento e divulgar, na ocorrência
                            destas hipóteses, os Participantes poderão ser informados por meio de
                            e-mail ou avisos publicados no próprio site.
                          </span>
                        </p>
                        <p>
                          <span>
                            Poderá ser desqualificado do Concurso o Participante que tenha: (i)
                            prestado informações ou declarações falsas; ou (ii) violado disposição
                            prevista no presente Termos e Condições.
                          </span>
                        </p>
                        <div className="page" title="Page 3" id="isPasted">
                          <div className="layoutArea">
                            <div className="column">
                              <p>
                                <span>
                                  <strong>Lei Aplicável</strong>
                                </span>
                              </p>
                              <p>
                                <span>
                                  Este Concurso será regido pelas leis do Brasil e todas as questões
                                  relativas a este Concurso serão resolvidas pelos tribunais do
                                  Brasil.
                                </span>
                              </p>
                              <p>
                                <span>
                                  Ao participar do Concurso, os participantes concordam com todos os
                                  termos e condições estabelecidos acima.
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </FullSizeCenteredFlexBoxBgImage>
      {resetTimmer && <RestartTimer delay={180} hideIcon />}
    </>
  );
}

export default Page3;
