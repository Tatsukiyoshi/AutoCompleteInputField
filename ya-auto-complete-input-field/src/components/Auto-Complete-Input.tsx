import React, { useState, useEffect, useRef, type FC } from 'react';
import './Auto-Complete-Input.css'; // スタイルシートのインポート

interface AutocompleteInputProps {
  options: string[]; // ドロップダウンの選択肢
  placeholder?: string; // テキストフィールドのプレースホルダー
  onSelect?: (value: string) => void; // 項目選択時のコールバック関数
}

const AutocompleteInput: FC<AutocompleteInputProps> = ({ options, placeholder = "入力または選択してください", onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // コンポーネント外をクリックしたときにリストを非表示にする
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOptionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 入力値が変更されたときの処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 入力値に基づいてオプションをフィルタリング
    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOptionsVisible(true); // 候補がある場合は表示
    } else {
      setFilteredOptions(options); // 入力がない場合は全ての候補を表示
      setIsOptionsVisible(true);
    }
  };

  // オプションがクリックされたときの処理
  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOptionsVisible(false); // 選択後はリストを非表示にする
    if (onSelect) {
      onSelect(option); // 親コンポーネントに選択された値を通知
    }
  };

  // フォーカス時にリストを表示
  const handleInputFocus = () => {
    setFilteredOptions(options); // フォーカス時に全ての候補をリセット
    setIsOptionsVisible(true);
  };

  // エンターキーが押されたときの処理 (オプションの選択)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredOptions.length > 0 && isOptionsVisible) {
      // 現在の入力値がfilteredOptionsに含まれるか確認し、含まれる場合はそれを選択
      const exactMatch = filteredOptions.find(opt => opt.toLowerCase() === inputValue.toLowerCase());
      if (exactMatch) {
        handleOptionClick(exactMatch);
      } else {
        // マッチしない場合は、最初の候補を選択 (任意)
        handleOptionClick(filteredOptions[0]);
      }
    }
  };

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off" // ブラウザのオートコンプリートを無効にする
      />
      {isOptionsVisible && filteredOptions.length > 0 && (
        <ul className="autocomplete-options">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;