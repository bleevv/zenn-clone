import { atom } from "jotai";

// エディターの基本状態
export const titleAtom = atom<string>("");
export const contentAtom = atom<string>("");
export const publicModeAtom = atom<boolean>(false);
export const previewModeAtom = atom<boolean>(false);

// 記事ID
export const articleIdAtom = atom<string>("");

// 派生状態：未保存の変更があるかどうか
export const hasUnsavedChangesAtom = atom<boolean>(false);

// 記事データを初期化するアクションatom
export const initializeArticleAtom = atom(
  null,
  (
    _get,
    set,
    article: {
      id: string;
      title?: string;
      content?: string;
      published?: boolean;
    }
  ) => {
    set(articleIdAtom, article.id);
    set(titleAtom, article.title ?? "");
    set(contentAtom, article.content ?? "");
    set(publicModeAtom, article.published ?? false);
    set(hasUnsavedChangesAtom, false);
  }
);

// タイトルを更新するアクションatom
export const updateTitleAtom = atom(null, (_get, set, newTitle: string) => {
  set(titleAtom, newTitle);
  set(hasUnsavedChangesAtom, true);
});

// コンテンツを更新するアクションatom
export const updateContentAtom = atom(null, (_get, set, newContent: string) => {
  set(contentAtom, newContent);
  set(hasUnsavedChangesAtom, true);
});

// 公開モードを切り替えるアクションatom
export const togglePublicModeAtom = atom(
  null,
  (_get, set, isPublic: boolean) => {
    set(publicModeAtom, isPublic);
    set(hasUnsavedChangesAtom, true);
  }
);

// 保存成功後にリセットするアクションatom
export const markAsSavedAtom = atom(
  null,
  (_get, set) => {
    set(hasUnsavedChangesAtom, false);
  }
);
