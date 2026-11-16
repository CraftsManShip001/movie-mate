"use client";

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  onError?: (error: unknown) => void;
  children: ReactNode;
}

/** 3D 장면(WebGL 생성 실패, 코드 조각 불러오기 실패 등)에서 난 오류를 잡아 오류 화면으로 바꾼다. */
export class SceneErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
