function Sidebar() {
    return (
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
                        <a
                            className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                            href="#"
                        >
                            <span className="text-left text-[#00E38C]">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                    <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">Dashboard</span>
                        </a>

                        <a
                            className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                            href="#"
                        >
                            <span className="text-left text-[#00E38C]">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                    <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">Faturas</span>
                        </a>
                        {/* Outros links */}
                    </div>
                </nav>
            </div>
        </div>

    )
}

export default Sidebar