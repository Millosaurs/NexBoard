"use client";

import { marked } from "marked";
import createDOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const html = marked.parse(content) as string;
    setSanitizedHtml(DOMPurify.sanitize(html));
  }, [content]);

  return (
    <div
      className="prose lg:prose-xl dark:prose-invert max-w-screen-xl"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
