import React from 'react';
import Link from 'next/link';

const GITHUB_USERNAME = 'devJayve';
const GITHUB_REPO = 'windowoon.dev';

interface GithubIssueButtonProps {
  postId: number;
  title: string;
}

function GithubIssueButton({ postId, title }: GithubIssueButtonProps) {
  const issueTitle = 'Feedback';
  const issueBody = `
  ### 기본 정보
  게시물 제목 : ${title}
  게시물 아이디 : ${postId}
  
  ### 상세 내용
  // 버그 및 개선 요청 내용을 여기에 작성해주세요.
  `;
  const issueUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(`${issueBody}`)}&labels=${encodeURIComponent('bug')}`;

  return (
    <Link
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="self-end text-sm font-medium text-neutral-700 underline dark:text-neutral-200"
    >
      issue to github
    </Link>
  );
}

export default GithubIssueButton;
