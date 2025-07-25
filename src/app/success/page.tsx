'use client';

// @ts-ignore
import Confetti from 'react-confetti';
// @ts-ignore
import { useWindowSize } from 'react-use';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SubmissionData {
  fullName: string;
  purchaseAmount: number;
  raffleEntries: number;
}

export default function SuccessPage() {
  const [data, setData] = useState<SubmissionData | null>(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const storedData = sessionStorage.getItem('submissionData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const fullName = data?.fullName || 'Customer';
  const purchaseAmount = data?.purchaseAmount || 0;
  const raffleEntries = data?.raffleEntries || '0';

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
        />
      )}
      <Card className="w-full max-w-md rounded-md border text-center shadow-lg">
        <CardHeader className="p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <div className="mt-4">
            <CardTitle className="text-2xl font-bold text-[#8a2a2b]">
              Submission Successful!
            </CardTitle>
            <CardDescription className="mt-2 text-base text-foreground">
              Hi <span className="font-bold">{fullName}</span> <br />✨ Thank
              you for joining the Tapa King Royal Escape 38th Anniversary
              Vacation Raffle! Based on your recent purchase of{' '}
              <span className="font-bold">{purchaseAmount}</span>, you have
              earned <span className="font-bold">{raffleEntries}</span> raffle
              entries!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="mb-6 rounded bg-slate-100 p-3 text-left text-sm">
            <p className="mb-3">
              🧾 Total Spent:{' '}
              <span className="font-bold">{purchaseAmount}</span>
            </p>
            <p>
              🎟️ Raffle Entries Earned:{' '}
              <span className="font-bold">{raffleEntries}</span>
            </p>
          </div>
          <p className="mb-6 text-sm text-gray-600">
            Winners will be announced after the raffle draw. Good luck!
          </p>
          <Button asChild className="w-full">
            <Link href="/">Back to Form</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
