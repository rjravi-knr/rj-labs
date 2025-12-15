'use client';

import * as React from 'react';
import { validatePassword, PasswordPolicy, DEFAULT_PASSWORD_POLICY } from '@labs/auth/password-policy';
import { Progress } from '@labs/ui/progress';
import { Check, X } from 'lucide-react';
import { cn } from '@labs/ui/lib/utils';

interface PasswordStrengthMeterProps {
  password: string;
  policy?: PasswordPolicy;
  userContext?: { email?: string; name?: string; username?: string };
}

export function PasswordStrengthMeter({ password, policy = DEFAULT_PASSWORD_POLICY, userContext }: PasswordStrengthMeterProps) {
  const result = validatePassword(password, policy, userContext);
  
  // Calculate score based on POLICY COMPLIANCE
  let score = 0;
  
  if (result.isValid) {
      // Base score for simply passing requirements (Start at 50)
      score = 50;
      
      // Bonus for Length (up to 25 points)
      // Example: min 8. If pwd is 13, (13-8)*5 = 25.
      const extraLength = password.length - policy.minLength;
      if (extraLength > 0) score += Math.min(25, extraLength * 5);

      // Bonus for Variety (up to 25 points)
      // Check for presence regardless of whether it's required or not
      let varietyScore = 0;
      if (/[A-Z]/.test(password)) varietyScore += 5;
      if (/[a-z]/.test(password)) varietyScore += 5;
      if (/[0-9]/.test(password)) varietyScore += 10; // Numbers weighted
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) varietyScore += 10; // Special weighted
      
      score += Math.min(25, varietyScore); 

      // Ensure 100 is reachable for decent passwords
      if (score > 100) score = 100;
  } else {
      // If invalid, cap score based on progress towards validity
      // But keep it "Weak" zone (<50)
      const lengthScore = Math.min(20, (password.length / policy.minLength) * 20);
      let varietyScore = 0;
      if (/[A-Z]/.test(password)) varietyScore += 5;
      if (/[0-9]/.test(password)) varietyScore += 5;
      score = Math.min(45, lengthScore + varietyScore);
  }
  
  const strength = Math.round(score);
  
  // Status Color
  let colorClass = '[&>div]:bg-red-500'; 
  if (strength >= 80) colorClass = '[&>div]:bg-green-500'; // Strong
  else if (strength >= 50) colorClass = '[&>div]:bg-yellow-500'; // Good/Medium

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs mb-1">
        <span className={strength > 80 && result.isValid ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
            {result.isValid ? 'Strong Password' : 'Weak Password'}
        </span>
        <span className="text-muted-foreground">{strength}%</span>
      </div>
      <Progress value={strength} className={cn("h-1.5", colorClass)} />
      
      <div className="text-xs space-y-1 mt-2">
        {result.errors.map((error, idx) => (
             <div key={idx} className="flex items-center text-red-500">
                <X className="w-3 h-3 mr-1" />
                {error}
             </div>
        ))}
         {/* Requirements Checklist (Visual Aid) */}
         {password.length > 0 && result.isValid && (
             <div className="flex items-center text-green-600">
                <Check className="w-3 h-3 mr-1" />
                Password meets all requirements
             </div>
         )}
      </div>
    </div>
  );
}
