// components/InvoiceLibrary.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

interface Client {
    numberClient: string;
    name: string;
    address: string;
    additionalAddress: string;
}

interface Invoice {
    id: number;
    numberClient: string;
    referenceMonth: string;
    electricalEnergyQuantity: number;
    electricalEnergyValue: number;
    energySCEEEWithoutICMSQuantity: number;
    energySCEEEWithoutICMSValue: number;
    compensatedEnergyGDQuantity: number;
    compensatedEnergyGDValue: number;
    contribMunicipalPublicLightValue: number;
    urlAccount: string;
    createdAt: string;
    updatedAt: string;
    client: Client;
}

export default function InvoiceLibrary() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const fetchInvoices = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/invoices`);
            if (!response.ok) {
                throw new Error('Erro ao buscar faturas');
            }
            const result = await response.json();
            setInvoices(result);
            setFilteredInvoices(result);
        } catch (error) {
            console.error('Erro ao buscar faturas:', error);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = invoices.filter((invoice) => {
                const isClientMatch = selectedClient ? invoice.numberClient === selectedClient : true;
                const isMonthMatch = selectedMonth ? invoice.referenceMonth === selectedMonth : true;
                return isClientMatch && isMonthMatch;
            });
            setFilteredInvoices(filtered);
        };

        applyFilters();
    }, [selectedClient, selectedMonth, invoices]);

    const clientOptions = useMemo(
        () => Array.from(new Set(invoices.map((invoice) => invoice.numberClient))),
        [invoices]
    );

    const monthOptions = useMemo(
        () => Array.from(new Set(invoices.map((invoice) => invoice.referenceMonth))),
        [invoices]
    );

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
                                {/* Outros links */}
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
                        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Biblioteca de Faturas</h1>

                        <div className="flex space-x-4 mt-6 gap-12">
                            <div>
                                <label className="text-lg font-semibold mr-2">Número do Cliente</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selectedClient}
                                    onChange={(e) => setSelectedClient(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {clientOptions.map((client) => (
                                        <option key={client} value={client}>
                                            {client}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-lg font-semibold mr-2">Mês de Referência</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {monthOptions.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            {filteredInvoices.length > 0 ? (
                                <ul>
                                    {filteredInvoices.map((invoice) => (
                                        <li key={invoice.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                        {invoice.referenceMonth} - Cliente {invoice.numberClient}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400">Nome: {invoice.client.name}</p>
                                                    <p className="text-gray-600 dark:text-gray-400">Endereço: {invoice.client.address}</p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        Consumo de Energia: {invoice.electricalEnergyQuantity} kWh
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        Valor da Energia: R$ {invoice.electricalEnergyValue.toFixed(2)}
                                                    </p>
                                                </div>
                                                <a
                                                    href={invoice.urlAccount}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#00E38C] font-semibold hover:underline"
                                                >
                                                    Download Fatura
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">Nenhuma fatura encontrada para os filtros selecionados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <nav className="fixed bottom-0 w-full bg-white shadow-lg dark:bg-gray-800 lg:hidden">
                <div className="flex justify-around py-3">
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1344 1024v384h-384v-384h-256v384H384v-384H0v768h1792V1024h-448z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384H384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1344 1024v384H448v-384H0v768h1792V1024H1344z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
        </main>
    );
}
