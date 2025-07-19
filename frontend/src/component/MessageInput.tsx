import {  Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (typeof reader.result == "string") {
        setImage(reader.result);
      } else {
        toast.error("Failed to read image file.");
      }
    };
  };

  const removeImage = () => {
    setImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({
        text: text.trim(),
        image,
      });
      setText("");
      setImage("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      console.log("Failed to send Message");
      console.log(e);
    }
  };
  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${image ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !image}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
