import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

// pega as chaves do supabase/firebase em consts

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = useState("");
  const [listaMensagens, setListaMensagens] = React.useState([
    // { //teste
    //   id: 1,
    //   de: "alanabacco",
    //   texto:
    //     ":sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png",
    // },
  ]);

  function excutaMensagensEmTempoReal(){
    return //coisa do supabase
  }

  useEffect(() => {
    // coloca o fetch do supabase/firebase

    // excutaMensagensEmTempoReal();
  }, []); //[listaMensagens]

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaMensagens.length + 1, /pega o que vem do servidor
      de: usuarioLogado,
      texto: novaMensagem,
    };

    // aqui é pra mandar as mensagens pro servidor

    setListaMensagens([mensagem, ...listaMensagens]);
    setMensagem("");
  }

  return (
    <Box //Background
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://images.unsplash.com/photo-1584720385649-1a18f5ad99c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                //onChange sempre recebe uma function
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  // pessoal usa pra fazer atalhos
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Digite sua mensagen.."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              // callback
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker:${sticker}`);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  //console.log("MessageList", props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {/* condicional / ternário*/}
            {mensagem.texto.startsWith(":sticker:")
              ? <Image src={mensagem.texto.replace(':sticker:', '')} />
              : mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
