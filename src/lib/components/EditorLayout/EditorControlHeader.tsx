"use client";

import {
  MdFullscreen,
  MdOutlineFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineNightlight,
} from "react-icons/md";
import { useState } from "react";
import SelectMenu from "./Dropdown";
import ImportJsonModal from "../ImportJsonModal";
import { useApp } from "../../stores/useApp";
import { useReactFlow } from "reactflow";
import DownloadModal from "../DownloadModal";
import { useFile } from "../../stores/useFile";
import { FILE_NAME } from "../../constants/constants";

export const EditorControlHeader = () => {
  const isEditorVisible = useApp((state) => state.isEditorVisible);
  const toggleEditorVisibilty = useApp((state) => state.toggleEditorVisibilty);
  const contents = useFile((state) => state.contents);

  const { fitView } = useReactFlow();

  const [isFullScreen, setFullScreen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullScreen(true))
        .catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  }

  function exportFile() {
    const blob = new Blob([contents], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${FILE_NAME}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleEditorVisiblity() {
    toggleEditorVisibilty();
    setTimeout(() => {
      fitView();
    }, 0);
  }

  return (
    <>
      <nav className="h-[3.375rem] w-full flex justify-between items-center py-2 border-b-2 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText border-gray-300 dark:border-gray-400">
        <div className="flex gap-1 md:gap-3  items-center">
          <button className="text-2xl" onClick={handleEditorVisiblity}>
            {isEditorVisible ? (
              <MdKeyboardArrowLeft />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>
          <button className="hidden md:block font-bold flex-1 dark:text-white">
            JSON Graph
          </button>
          <SelectMenu label="File">
            <a>
              <button
                className=" dark:text-white"
                onClick={() => setIsJsonModalOpen(true)}
              >
                Import
              </button>
            </a>
            <a>
              {contents && (
                <button className=" dark:text-white" onClick={exportFile}>
                  Export
                </button>
              )}
            </a>
            <a>
              {contents && (
                <button
                  className=" dark:text-white"
                  onClick={() => setIsDownloadModalOpen(true)}
                >
                  Download
                </button>
              )}
            </a>
          </SelectMenu>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlineNightlight />
          <button className="text-3xl" onClick={() => toggleFullScreen()}>
            {isFullScreen ? <MdOutlineFullscreenExit /> : <MdFullscreen />}
          </button>
        </div>
      </nav>
      <ImportJsonModal
        isModalOpen={isJsonModalOpen}
        closeModal={() => setIsJsonModalOpen(false)}
      />

      <DownloadModal
        isModalOpen={isDownloadModalOpen}
        closeModal={() => setIsDownloadModalOpen(false)}
      />
    </>
  );
};
