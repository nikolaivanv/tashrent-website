import { useToast } from '@/hooks/useToast';
import React from 'react';
import { Link as LinkIcon } from 'react-feather';

export default function CopyLinkButton() {
  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: 'Link copied to clipboard',
    });
  };

  return (
    <button type="button" className="w-6 h-6" onClick={handleClick}>
      <LinkIcon className="stroke-mint-700" />
    </button>
  );
}
