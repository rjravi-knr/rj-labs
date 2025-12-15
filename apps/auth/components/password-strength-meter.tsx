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
      // Base score for simply passing requirements
      score = 60;
      
      // Bonus for exceeding minLength
      const extraLength = password.length - policy.minLength;
      if (extraLength > 0) score += Math.min(20, extraLength * 5); // +5 per extra char, max 20

      // Bonus for extra variety (e.g. using special chars when not required)
      if (!policy.requireSpecial && /[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;
      if (!policy.requireNumbers && /[0-9]/.test(password)) score += 10;
      
      score = Math.min(100, score);
  } else {
      // If invalid, cap score at 40 (Weak/Red)
      // Give some credit for length
      const lengthScore = Math.min(30, (password.length / policy.minLength) * 30);
      score = lengthScore;
  }
  
  const strength = Math.round(score);
  
  // Status Color
  let colorClass = '[&>div]:bg-red-500'; // Default Weak
  if (strength >= 80) colorClass = '[&>div]:bg-green-500'; // Strong
  else if (strength >= 50) colorClass = '[&>div]:bg-yellow-500'; // Medium

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
