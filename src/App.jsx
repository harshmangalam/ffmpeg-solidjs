import {
  Box,
  Button,
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  HopeProvider,
  HStack,
  Text,
  VStack,
} from "@hope-ui/solid";
import useFFmpeg from "./hooks/useFFmpeg";
import { Show } from "solid-js";
function App() {
  let fileRef;
  const { store, handleFileChange } = useFFmpeg();
  return (
    <HopeProvider config={{ initialColorMode: "dark" }}>
      <Container minH={"100vh"} display="grid" placeItems={"center"}>
        <Box py={"$4"}>
          <Heading fontSize={"$4xl"} textAlign="center">
            Video processing in browser using
            <Box>
              <Text as="span" color={"$success10"}>
                FFmpeg{" "}
              </Text>
              and{" "}
              <Text as="span" color={"$primary10"}>
                SolidJS
              </Text>
            </Box>
          </Heading>

          <HStack justifyContent={"center"} mt={"$6"}>
            <input
              type="file"
              name="file"
              id="file"
              hidden
              onChange={[handleFileChange]}
              ref={fileRef}
            />
            <Button onClick={() => fileRef.click()}>Select Video File</Button>
          </HStack>
        </Box>

        <Show when={store.progress}>
          <HStack justifyContent={"center"} mt={"$6"} spacing={"$6"}>
            <CircularProgress
              value={Math.round(store.progress?.ratio * 100)}
              size={200}
            >
              <CircularProgressIndicator color="$success10" />
              <CircularProgressLabel>
                <VStack spacing={"$2"}>
                  <Heading fontSize={"$xl"}>Ratio</Heading>
                  <Heading fontSize={"$3xl"}>
                    {Math.round(store.progress?.ratio * 100)} %
                  </Heading>
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>

            <CircularProgress value={100} size={200} thickness={"$1"}>
              <CircularProgressIndicator color="$success10" />
              <CircularProgressLabel>
                <VStack spacing={"$2"}>
                  <Heading fontSize={"$xl"}>Duration</Heading>
                  <Heading fontSize={"$3xl"}>
                    {store.progress?.duration}
                  </Heading>
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>

            <CircularProgress size={200} indeterminate>
              <CircularProgressIndicator color="$primary10" />
              <CircularProgressLabel>
                <VStack spacing={"$2"}>
                  <Heading fontSize={"$xl"}>Time</Heading>
                  <Heading fontSize={"$3xl"}>{store.progress?.time}</Heading>
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>
          </HStack>
        </Show>

        <Show when={store.videoURL}>
          <Flex justifyContent={"center"} mt={"$6"}>
            <video
              src={store.videoURL}
              width={"600px"}
              height={"400px"}
              autoPlay
              controls
            />
          </Flex>
        </Show>
      </Container>
    </HopeProvider>
  );
}

export default App;
