import React from 'react';
import { RichTextRendererComponent } from '@uniformdev/canvas-react';
import { ListNode, RichTextNode } from '@uniformdev/richtext';
import Image from 'next/image';

// Custom renderer for ordered lists
export const MyOrderedListNode: RichTextRendererComponent<RichTextNode> = ({ children }) => {
  return (
    <ol className="list-decimal list-inside space-y-2 my-6 last:mb-0 text-muted-foreground leading-relaxed">
      {children}
    </ol>
  );
};

// Custom renderer for unordered lists
export const MyUnorderedListNode: RichTextRendererComponent<RichTextNode> = ({ children }) => {
  return (
    <ul className="list-disc list-inside space-y-2 my-6 last:mb-0 text-muted-foreground leading-relaxed">
      {children}
    </ul>
  );
};

// Custom renderer for list items
export const MyListItemNode: RichTextRendererComponent<RichTextNode> = ({ children }) => {
  return (
    <li className="mb-2 text-muted-foreground leading-relaxed ml-2">
      {children}
    </li>
  );
};

// Custom renderer for headings
export const MyHeadingNode: RichTextRendererComponent<RichTextNode> = ({ children, node }) => {
  const headingNode = node as { tag?: string };
  const tag = headingNode.tag || 'h2';
  const baseClasses = "font-bold text-primary leading-tight mt-8 mb-4 last:mb-0 text-tight";
  
  const headingClasses = {
    h1: `text-4xl ${baseClasses}`,
    h2: `text-3xl ${baseClasses}`,
    h3: `text-2xl ${baseClasses}`,
    h4: `text-xl ${baseClasses}`,
    h5: `text-lg ${baseClasses}`,
    h6: `text-base ${baseClasses}`
  };

  const className = headingClasses[tag as keyof typeof headingClasses] || headingClasses.h2;

  switch (tag) {
    case 'h1':
      return <h1 className={className}>{children}</h1>;
    case 'h2':
      return <h2 className={className}>{children}</h2>;
    case 'h3':
      return <h3 className={className}>{children}</h3>;
    case 'h4':
      return <h4 className={className}>{children}</h4>;
    case 'h5':
      return <h5 className={className}>{children}</h5>;
    case 'h6':
      return <h6 className={className}>{children}</h6>;
    default:
      return <h2 className={className}>{children}</h2>;
  }
};

// Custom renderer for paragraphs (with horizontal rule detection)
export const MyParagraphNode: RichTextRendererComponent<RichTextNode> = ({ children, node }) => {
  // Check if this paragraph contains only horizontal rule markers
  const paragraphNode = node as { 
    children?: Array<{ 
      text?: string; 
      type?: string; 
    }> 
  };
  
  // Check if paragraph contains only dashes, asterisks, or underscores for horizontal rules
  const textContent = paragraphNode.children
    ?.filter(child => child.type === 'text')
    ?.map(child => child.text)
    ?.join('') || '';
  
  const isHorizontalRule = /^[-*_]{3,}$/.test(textContent.trim());
  
  if (isHorizontalRule) {
    return (
      <div className="my-12 last:mb-0 flex justify-center">
        <div className="flex items-center gap-6 w-full max-w-lg">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400"></div>
          <div className="w-2 h-2 bg-ui-primary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
        </div>
      </div>
    );
  }
  
  return (
    <p className="text-muted-foreground leading-relaxed mb-6 last:mb-0">
      {children}
    </p>
  );
};

// Custom renderer for assets (images) with spacing
export const MyAssetNode: RichTextRendererComponent<RichTextNode> = ({ node }) => {
  const assetNode = node as { 
    __asset?: { 
      type?: string; 
      fields?: { 
        title?: { value?: string }; 
        description?: { value?: string };
        url?: { value?: string };
      } 
    } 
  };
  const asset = assetNode.__asset;

  if (!asset || !asset.type || asset.type !== 'image') {
    return null;
  }

  try {
    // Use the direct URL from the rich text asset
    const imageUrl = asset.fields?.url?.value;
    
    if (!imageUrl) {
      return null;
    }
    
    const alt = asset.fields?.description?.value || asset.fields?.title?.value || 'Article image';
    const caption = asset.fields?.title?.value;

    return (
      <div className="my-8 last:mb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-secondary/20 max-w-4xl mx-auto">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
        {caption && (
          <p className="text-sm text-muted-foreground text-center mt-3 italic">
            {caption}
          </p>
        )}
      </div>
    );
  } catch {
    // Fallback if image processing fails
    return (
      <div className="my-8 last:mb-0 p-4 bg-secondary/20 rounded-lg text-center text-muted-foreground">
        <p>Image unavailable</p>
      </div>
    );
  }
};

// Custom renderer for quotes/blockquotes
export const MyQuoteNode: RichTextRendererComponent<RichTextNode> = ({ children }) => {
  return (
    <blockquote className="border-l-4 border-primary pl-6 my-8 last:mb-0 italic text-lg text-primary/80 bg-primary/5 py-4 rounded-r-lg">
      {children}
    </blockquote>
  );
};

// Resolve the custom renderers based on node type
export function resolveRichTextRenderer(node: RichTextNode): RichTextRendererComponent<RichTextNode> | undefined {
  if (node.type === 'list') {
    const listNode = node as ListNode;
    return listNode.tag === 'ol' ? MyOrderedListNode : MyUnorderedListNode;
  }
  
  if (node.type === 'listitem') {
    return MyListItemNode;
  }
  
  if (node.type === 'paragraph') {
    return MyParagraphNode;
  }
  
  if (node.type === 'heading') {
    return MyHeadingNode;
  }
  
  if (node.type === 'asset') {
    return MyAssetNode;
  }
  
  if (node.type === 'quote') {
    return MyQuoteNode;
  }

  // Return undefined for default behavior (links, formatting, etc.)
  return undefined;
}
