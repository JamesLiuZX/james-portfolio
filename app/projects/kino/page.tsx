import type { Metadata } from "next"
import CaseStudyPage, { type CaseStudy } from "@/components/case-study"

// Every figure below is from Kino's own repository (kino/ in this repo): the
// workflow build output, the node registry, the preset list and the test suite.
const kino: CaseStudy = {
  eyebrow: "Case study · Multimodal AI · Video",
  title: "Kino: a one-box studio for open video models",
  accent: "one-box studio",
  lede: "Tools like Higgsfield and Runway hide great models behind credits; ComfyUI exposes them as graphs only experts can drive. Kino puts 2026's best open image and video models behind one text box, on GPUs you rent by the second, and adds an Ad Studio that writes, checks and edits short video ads.",
  cover: {
    src: "/kino.webp",
    alt: "Kino's camera move picker: twenty moves previewed live on a HerbalBath product photo",
    href: "https://github.com/JamesLiuZX/james-portfolio/tree/main/kino",
  },
  links: [
    { label: "Read the code", href: "https://github.com/JamesLiuZX/james-portfolio/tree/main/kino" },
    { label: "RunPod setup guide", href: "https://github.com/JamesLiuZX/james-portfolio/tree/main/kino/runpod" },
  ],
  metrics: [
    { value: "11", label: "Official ComfyUI workflows, converted and validated" },
    { value: "647", label: "ComfyUI 0.41 node definitions read from source" },
    { value: "20", label: "Camera moves, previewed live on your photo" },
    { value: "39", label: "Automated tests, from protocols to a full ad render" },
  ],
  facts: [
    { label: "Models", value: "MiniMax H3, Wan 2.2, Qwen Image 2.1, Z-Image-Turbo, LTX-2.3, SeedVR2, FILM" },
    { label: "Runs on", value: "A RunPod GPU pod running ComfyUI, or RunPod Serverless (pay per second)" },
    { label: "Ad formats", value: "TikTok and Reels 9:16, feed 4:5, square 1:1" },
    { label: "Writing", value: "Claude Opus 5.5 with structured outputs; templates when there is no key" },
    { label: "Status", value: "Works end to end in demo mode; GPU paths tested against protocol fakes" },
  ],
  stack: ["Node 22 (no runtime dependencies)", "Vanilla JS", "ComfyUI 0.41", "RunPod", "ffmpeg + libass", "Claude API"],
  sections: [
    {
      heading: "The problem",
      paragraphs: [
        "The open models caught up in 2026: MiniMax H3 makes video with native sound, Qwen Image 2.1 sets legible Chinese and English text, Z-Image-Turbo is photoreal in eight steps. Using them still means wiring ComfyUI graphs, finding the right model files and renting a GPU.",
        "HerbalBath, the brand I co-founded, needs a steady stream of short Mandarin video ads for a 55+ audience, and every one has to get past Meta's and TikTok's health-ad review. Kino is built for both jobs: an easy studio, and an ad line on top of it.",
      ],
    },
    {
      heading: "One box, many models",
      paragraphs: [
        "Six tools (image, video, edit, cut out, talking photo, enhance) each offer a couple of apps. An app is an official ComfyUI template plus the handful of knobs a person should ever touch: a start frame, a camera move, a look, a sound, a length.",
        "One preset feeds three places so they never drift apart. A camera move is a phrase for the video models, a CSS animation for its picker card, and an exact ffmpeg move for the free instant mode. Prompts are translated into each model's dialect, such as H3's shot lists with picture references and an audio line.",
      ],
    },
    {
      heading: "Workflows are generated, not hand-written",
      paragraphs: [
        "A script reads every core node definition out of ComfyUI's Python source without importing torch: 647 nodes, including dynamic option trees. A converter then turns the editor's workflow format into the API format a GPU runs, handling subgraphs, promoted widgets, primitives and bypassed nodes, and validates every graph before a second of GPU time is billed.",
        "The same build lists every model file each workflow loads, which drives a downloader that fetches only what your chosen apps need. Bring-your-own works the same way: drop a workflow from Civitai or OpenArt and Kino finds its prompt, inputs, size and seed and turns it into a one-box app.",
      ],
    },
    {
      heading: "The Ad Studio",
      paragraphs: [
        "Pick a brand, a platform, a language and up to three angles. Claude writes storyboards against a strict JSON schema from the brand profile and the product photo; without a key, templates built only from the brand's approved wording do it.",
        "Product shots animate the real product photo; generated scenes never show the product, so a model can't invent a different bottle. The editor cuts shots to length, burns in large captions inside each platform's safe zone, breaks Chinese lines without splitting a price, composes an end card from the product cut-out, adds a music bed and normalises loudness to -14 LUFS.",
      ],
      bullets: [
        "Every script is checked before anything is made: banned words in both languages, effect claims that aren't approved word for word, Meta's personal-attributes policy, before-and-after, superlatives and medical settings.",
        "Blocking issues need an explicit “make it anyway”: the checker advises, the brand owner decides.",
        "The same shots re-cut for another platform in one click; the player shades where each app's buttons and captions sit.",
      ],
    },
    {
      heading: "Backends that fail in plain language",
      paragraphs: [
        "Demo mode needs no GPU and still makes real files, so the whole studio can be tried and tested first. On a ComfyUI server Kino chooses its own prompt id, listens on the WebSocket for step-by-step progress and falls back to polling. On RunPod Serverless it sends inputs inline and explains cold starts while it waits.",
        "A missing model file comes back as the file's name and the command that fetches it, not a stack trace. Settings tests the connection and lists which apps have all their models.",
      ],
    },
    {
      heading: "Limits, stated honestly",
      bullets: [
        "The GPU paths are tested against faithful fakes of ComfyUI and RunPod; a first paid run is the next step.",
        "Model licences vary and some restrict commercial use; each must be checked before running ads.",
        "Serverless takes 10 MB of inputs per job, so long video jobs belong on a pod.",
        "The checker reads words, not pixels: a product label's own claims still need a human eye.",
      ],
    },
    {
      heading: "The product call underneath",
      paragraphs: [
        "Keep the parts that must be right deterministic (validation, compliance, editing, file handling) and use models where they are strong: writing and pixels. Show one box by default, keep every result inspectable and remixable, and make the expensive step, the GPU, the last thing to plug in.",
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: "Kino, a one-box AI video studio",
  description:
    "Open image and video models behind one text box, on RunPod GPUs, with an Ad Studio that writes, compliance-checks and edits TikTok and Meta ads.",
}

export default function KinoCaseStudy() {
  return <CaseStudyPage study={kino} />
}
