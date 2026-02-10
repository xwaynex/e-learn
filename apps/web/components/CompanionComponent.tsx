"use client";

import { cn, configureAssistant, getSubjectColor } from "@/app/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "app/constants/soundwaves.json";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  topic,
  subject,
  name,
  userName,
  userImage,
  companionId,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [lottieRef, isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessages = { role: message.role, content: message.transcript };

        setMessages((prev) => [newMessages, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const omSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: unknown) => console.log("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", omSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", omSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();

    vapi.setMuted(!isMuted);

    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const baseAssistant = configureAssistant(voice, style);

    const assistantOverrides = {
      ...baseAssistant,
      variableValues: { subject, topic, style },
      clientMessages: ["transcript", "hang", "function-call"],
      serverMessages: ["hang", "function-call"],
    };

    vapi.start(assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse",
              )}
            ></div>
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={150}
              height={150}
              className="max-sm:w-fit"
            />
          </div>

          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
            )}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoplay={false}
              className="companion-lottie"
            />
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            {" "}
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl"> {userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : " Turn Off Microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? "connecting"
                : "start session"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-messages no-scrollbar">
          {messages.map((message, i) => {
            if (message.role === "assistant") {
              return (
                <p key={i} className="max-sm:text-sm">
                  {name.split(" ")[0]?.replace("/[.,]/g, ", "")}
                </p>
              );
            } else {
              return (
                <p key={i} className="text-primary max-sm:text-sm">
                  {userName} : {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
