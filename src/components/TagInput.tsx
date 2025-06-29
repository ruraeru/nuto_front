"use client"

import React, { useState } from 'react';

interface TagInputProps {
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
    initialTags = ['쇼핑', '식비', '카페', '군것질', '건강'],
    onTagsChange
}) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [inputValue, setInputValue] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);

    // Hero Icons as SVG components
    const XMarkIcon = () => (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const PlusIcon = () => (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );

    const handleAddTag = (): void => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            setInputValue('');
            setShowInput(false);
            onTagsChange?.(newTags);
        }
    };

    const handleRemoveTag = (indexToRemove: number): void => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        onTagsChange?.(newTags);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleAddTag();
        } else if (e.key === 'Escape') {
            setInputValue('');
            setShowInput(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white">
            <h2 className="text-lg font-medium mb-4 text-gray-800">카테고리</h2>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {tag}
                            <button
                                onClick={() => handleRemoveTag(index)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label={`${tag} 태그 삭제`}
                            >
                                <XMarkIcon />
                            </button>
                        </span>
                    ))}

                    {showInput ? (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-300 rounded-full">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                onBlur={() => {
                                    if (inputValue.trim()) {
                                        handleAddTag();
                                    } else {
                                        setShowInput(false);
                                    }
                                }}
                                className="text-sm bg-transparent outline-none min-w-0 w-16"
                                placeholder="태그명"
                                autoFocus
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowInput(true)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <PlusIcon />
                            태그 추가
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
                • 태그를 클릭하여 삭제할 수 있습니다 <br />
                • Enter 키로 태그를 추가하거나 ESC 키로 취소할 수 있습니다
            </div>
        </div>
    );
};

export default TagInput;