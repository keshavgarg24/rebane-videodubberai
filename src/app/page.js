"use client"

import { useState, useRef, useEffect } from "react"
import { Container, Title, Text, Button, Group, Textarea, Box, Center, Stack, Notification } from "@mantine/core"
import { MantineProvider, createTheme } from "@mantine/core"
import "@mantine/core/styles.css"

// Discord ANSI color codes
const FG_COLORS = [
  { name: "gray", code: 30, hex: "#6b6f76" },
  { name: "red", code: 31, hex: "#ed4245" },
  { name: "green", code: 32, hex: "#a0c263" },
  { name: "yellow", code: 33, hex: "#c9a53d" },
  { name: "blue", code: 34, hex: "#5865f2" },
  { name: "magenta", code: 35, hex: "#eb459e" },
  { name: "cyan", code: 36, hex: "#64d9a8" },
  { name: "white", code: 37, hex: "#ffffff" },
]

const BG_COLORS = [
  { name: "darkBlue", code: 40, hex: "#1e2124" },
  { name: "orange", code: 41, hex: "#f04747" },
  { name: "teal", code: 42, hex: "#43b581" },
  { name: "navy", code: 43, hex: "#36393f" },
  { name: "gray", code: 44, hex: "#72767d" },
  { name: "purple", code: 45, hex: "#7289da" },
  { name: "lightGray", code: 46, hex: "#99aab5" },
  { name: "cream", code: 47, hex: "#faa61a" },
]

// Create a custom theme
const theme = createTheme({
  fontFamily: "Arial, sans-serif",
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
})

export default function Home() {
  const [text, setText] = useState("Welcome to Rebane's Discord Colored Text Generator!")
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [formattedText, setFormattedText] = useState("")
  const [showCopied, setShowCopied] = useState(false)

  // Update the formatted text whenever the text changes
  useEffect(() => {
    setFormattedText("```ansi\n" + text + "\n```")
  }, [text])

  // Apply color to selected text
  const applyColor = (colorCode: number, isBackground = false) => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd

    if (start === end) return // No text selected

    const prefix = `\u001b[${colorCode}m`
    const resetCode = "\u001b[0m"

    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)

    const newText = before + prefix + selection + resetCode + after
    setText(newText)

    // Restore selection after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newPosition = start + prefix.length + selection.length + resetCode.length
        textareaRef.current.setSelectionRange(start, newPosition)
      }
    }, 0)
  }

  // Apply bold formatting
  const applyBold = () => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd

    if (start === end) return // No text selected

    const boldCode = "\u001b[1m"
    const resetCode = "\u001b[0m"

    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)

    const newText = before + boldCode + selection + resetCode + after
    setText(newText)

    // Restore selection after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newPosition = start + boldCode.length + selection.length + resetCode.length
        textareaRef.current.setSelectionRange(start, newPosition)
      }
    }, 0)
  }

  // Apply underline formatting
  const applyLine = () => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd

    if (start === end) return // No text selected

    const underlineCode = "\u001b[4m"
    const resetCode = "\u001b[0m"

    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)

    const newText = before + underlineCode + selection + resetCode + after
    setText(newText)

    // Restore selection after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newPosition = start + underlineCode.length + selection.length + resetCode.length
        textareaRef.current.setSelectionRange(start, newPosition)
      }
    }, 0)
  }

  // Reset all formatting
  const resetAll = () => {
    setText(text.replace(/\u001b\[\d+m/g, ""))
  }

  // Copy formatted text to clipboard
  const copyText = () => {
    navigator.clipboard.writeText(formattedText)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  return (
    <MantineProvider theme={theme}>
      <div style={{ backgroundColor: "#2c2f33", minHeight: "100vh", padding: "20px 0" }}>
        <Container size="md">
          <Stack spacing="md" align="center">
            <Title order={1} align="center" style={{ color: "white", fontSize: "32px" }}>
              Rebane&apos;s Discord{" "}
              <Text component="span" style={{ color: "#5865f2" }}>
                Colored
              </Text>{" "}
              Text Generator
            </Title>

            <Box w="100%" mt={20}>
              <Title order={2} align="center" style={{ color: "white", fontSize: "24px" }}>
                About
              </Title>
              <Text align="center" style={{ color: "white", maxWidth: "700px", margin: "0 auto", marginTop: "10px" }}>
                This is a simple app that creates colored Discord messages using the ANSI color codes available on the
                latest Discord desktop versions.
              </Text>
              <Text align="center" style={{ color: "white", maxWidth: "700px", margin: "0 auto", marginTop: "10px" }}>
                To use this, write your text, select parts of it and assign colors to them, then copy it using the
                button below, and send in a Discord message.
              </Text>
            </Box>

            <Box w="100%" mt={10}>
              <Title order={2} align="center" style={{ color: "white", fontSize: "24px" }}>
                Source Code
              </Title>
              <Text align="center" style={{ color: "white", maxWidth: "700px", margin: "0 auto", marginTop: "10px" }}>
                This app runs entirely in your browser and the source code is freely available on{" "}
                <Text component="a" href="https://github.com" style={{ color: "#5865f2" }}>
                  GitHub
                </Text>
                . Shout out to kkrypt0nn for{" "}
                <Text component="a" href="#" style={{ color: "#5865f2" }}>
                  this guide
                </Text>
                .
              </Text>
            </Box>

            <Title order={2} align="center" style={{ color: "white", fontSize: "28px", marginTop: "20px" }}>
              Create your text
            </Title>

            <Group spacing="xs" position="center" mt={10}>
              <Button
                onClick={resetAll}
                style={{ backgroundColor: "#4f545c", color: "white", border: "none" }}
                radius="sm"
              >
                Reset All
              </Button>
              <Button
                onClick={applyBold}
                style={{ backgroundColor: "#4f545c", color: "white", border: "none" }}
                radius="sm"
              >
                Bold
              </Button>
              <Button
                onClick={applyLine}
                style={{ backgroundColor: "#4f545c", color: "white", border: "none" }}
                radius="sm"
              >
                Line
              </Button>
            </Group>

            <Box w="100%" mt={10}>
              <Group spacing="xs" position="left" noWrap>
                <Text style={{ color: "white", width: "30px", fontWeight: "bold" }}>FG</Text>
                <Group spacing={5} style={{ flex: 1 }}>
                  {FG_COLORS.map((color) => (
                    <Box
                      key={color.name}
                      style={{
                        backgroundColor: color.hex,
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        border: "1px solid #222",
                        borderRadius: "0",
                      }}
                      onClick={() => applyColor(color.code)}
                    />
                  ))}
                </Group>
              </Group>
            </Box>

            <Box w="100%" mt={5}>
              <Group spacing="xs" position="left" noWrap>
                <Text style={{ color: "white", width: "30px", fontWeight: "bold" }}>BG</Text>
                <Group spacing={5} style={{ flex: 1 }}>
                  {BG_COLORS.map((color) => (
                    <Box
                      key={color.name}
                      style={{
                        backgroundColor: color.hex,
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        border: "1px solid #222",
                        borderRadius: "0",
                      }}
                      onClick={() => applyColor(color.code, true)}
                    />
                  ))}
                </Group>
              </Group>
            </Box>

            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              minRows={10}
              style={{
                width: "100%",
                backgroundColor: "#36393f",
                color: "white",
                fontFamily: "monospace",
                border: "1px solid #222",
                borderRadius: "4px",
                marginTop: "10px",
              }}
              styles={{
                input: {
                  backgroundColor: "#36393f",
                  color: "white",
                  fontFamily: "monospace",
                  padding: "10px",
                  minHeight: "200px",
                  "&:focus": {
                    borderColor: "#5865f2",
                  },
                },
              }}
            />

            <Center mt={10} style={{ position: "relative" }}>
              <Button
                onClick={copyText}
                style={{
                  backgroundColor: "#4f545c",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                }}
              >
                Copy text as Discord formatted
              </Button>

              {showCopied && (
                <Notification
                  style={{
                    position: "absolute",
                    top: "-40px",
                    backgroundColor: "#43b581",
                    color: "white",
                    border: "none",
                  }}
                  onClose={() => setShowCopied(false)}
                >
                  Copied to clipboard!
                </Notification>
              )}
            </Center>
          </Stack>
        </Container>
      </div>
    </MantineProvider>
  )
}

