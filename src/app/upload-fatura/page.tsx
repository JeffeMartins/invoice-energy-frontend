// components/UploadInvoices.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UploadInvoices() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("Selecione um arquivo para upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage("Upload realizado com sucesso!");
                setIsModalOpen(true); // Abre o modal de sucesso
            } else {
                setMessage("Erro ao realizar o upload. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao fazer upload:", error);
            setMessage("Erro de conexão ao realizar o upload.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessage(null);
        setFile(null);
    };

    return (
        <main className="p-3 relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="flex items-start justify-between gap-3">
                <div
                    className="relative hidden h-screen shadow-lg lg:block w-80 p-3 bg-[#03221D] rounded-l-[16px] rounded-r-[32px]"
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                    <div className="h-full">
                        <div className="flex items-center justify-start pt-6 ml-8">
                            <p className="text-2xl font-bold text-[#00E38C]">Lumi</p>
                        </div>
                        <nav className="mt-6">
                            <div className="flex flex-col space-y-4">
                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/dashboard"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Dashboard</span>
                                </Link>

                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/fatura"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Faturas</span>
                                </Link>
                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/upload-fatura"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Upload de Faturas</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col w-full md:space-y-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <header className="z-40 flex items-center justify-between w-full h-16">
                        <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                            <div className="relative flex items-center justify-end w-full p-1 space-x-4"></div>
                        </div>
                    </header>

                    <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
                        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Upload de Notas</h1>

                        <div className="flex justify-center mt-10">
                            <form onSubmit={handleUpload} className="w-full max-w-md p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                                <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-4">Selecione o arquivo de notas:</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <button
                                    type="submit"
                                    className="mt-6 w-full p-2 bg-[#00E38C] text-white font-semibold rounded-lg hover:bg-[#00d082] transition"
                                >
                                    Fazer Upload
                                </button>
                                {message && (
                                    <p className="mt-4 text-center text-gray-800 dark:text-white">{message}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Sucesso!</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">Upload realizado com sucesso!</p>
                        <button
                            onClick={closeModal}
                            className="mt-6 px-4 py-2 bg-[#00E38C] text-white rounded-lg hover:bg-[#00d082] transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
