
import './globals.css';

export const metadata = {
    title: 'EnergyLab',
    description: 'EnergyLab solução de dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <head>
                <link rel="icon" href="/img/icone.png" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
