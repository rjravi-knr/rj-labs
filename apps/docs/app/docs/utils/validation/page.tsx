"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Button } from "@labs/ui/button"
import { Input } from "@labs/ui/input"
import { CheckCircle, XCircle } from "lucide-react"
import { 
  isEmail, isUrl, isPhone, isUUID, isSlug,
  isCreditCard, isIPAddress, isHexColor,
  isStrongPassword, validatePasswordStrength,
  isAlphanumeric, isNumeric, isJSON
} from "@labs/utils/validation"

const validators = [
  {
    name: "isEmail",
    signature: "isEmail(email: string): boolean",
    description: "Validate email address (RFC 5322)",
    placeholder: "test@example.com",
    fn: isEmail,
    examples: ["valid@example.com", "invalid@", "test@test"]
  },
  {
    name: "isUrl",
    signature: "isUrl(url: string): boolean",
    description: "Validate HTTP/HTTPS URL",
    placeholder: "https://example.com",
    fn: isUrl,
    examples: ["https://example.com", "http://test.com", "not-a-url"]
  },
  {
    name: "isPhone",
    signature: "isPhone(phone: string): boolean",
    description: "Validate phone number (international format)",
    placeholder: "+1 234 567 8900",
    fn: isPhone,
    examples: ["+1 234 567 8900", "1234567890", "123"]
  },
  {
    name: "isUUID",
    signature: "isUUID(uuid: string): boolean",
    description: "Validate UUID v4",
    placeholder: "550e8400-e29b-41d4-a716-446655440000",
    fn: isUUID,
    examples: ["550e8400-e29b-41d4-a716-446655440000", "invalid-uuid"]
  },
  {
    name: "isSlug",
    signature: "isSlug(slug: string): boolean",
    description: "Validate URL slug format",
    placeholder: "hello-world",
    fn: isSlug,
    examples: ["hello-world", "valid-slug-123", "Invalid_Slug"]
  },
  {
    name: "isCreditCard",
    signature: "isCreditCard(number: string): boolean",
    description: "Validate credit card using Luhn algorithm",
    placeholder: "4532015112830366",
    fn: isCreditCard,
    examples: ["4532015112830366", "1234567890123456"]
  },
  {
    name: "isIPAddress",
    signature: "isIPAddress(ip: string): boolean",
    description: "Validate IPv4 address",
    placeholder: "192.168.1.1",
    fn: isIPAddress,
    examples: ["192.168.1.1", "10.0.0.1", "256.1.1.1", "not-an-ip"]
  },
  {
    name: "isHexColor",
    signature: "isHexColor(color: string): boolean",
    description: "Validate hex color code",
    placeholder: "#ff6b6b",
    fn: isHexColor,
    examples: ["#ff6b6b", "#f00", "#invalid"]
  },
  {
    name: "isStrongPassword",
    signature: "isStrongPassword(password: string): boolean",
    description: "Check if password meets security requirements",
    placeholder: "MyP@ssw0rd!",
    fn: isStrongPassword,
    examples: ["MyP@ssw0rd!", "weak", "Strong123!"]
  },
  {
    name: "isAlphanumeric",
    signature: "isAlphanumeric(text: string): boolean",
    description: "Check if string contains only letters and numbers",
    placeholder: "abc123",
    fn: isAlphanumeric,
    examples: ["abc123", "hello", "test@123"]
  },
  {
    name: "isNumeric",
    signature: "isNumeric(text: string): boolean",
    description: "Check if string contains only numbers",
    placeholder: "12345",
    fn: isNumeric,
    examples: ["12345", "123.45", "abc"]
  },
  {
    name: "isJSON",
    signature: "isJSON(text: string): boolean",
    description: "Check if string is valid JSON",
    placeholder: '{"key": "value"}',
    fn: isJSON,
    examples: ['{"key": "value"}', "not json", '["array"]']
  }
]

function ValidatorDemo({ validator }: { validator: typeof validators[0] }) {
  const [input, setInput] = useState(validator.placeholder)
  const [result, setResult] = useState<boolean | null>(null)

  const handleValidate = () => {
    try {
      const isValid = validator.fn(input)
      setResult(isValid)
    } catch (error) {
      setResult(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-mono">{validator.name}()</CardTitle>
            <CardDescription className="mt-1 font-mono text-xs">{validator.signature}</CardDescription>
          </div>
          <Badge variant="secondary">Validation</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{validator.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Test input:</label>
          <div className="mt-2 flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => {
                setInput(e.target.value)
                setResult(null)
              }}
              placeholder={validator.placeholder}
              className="font-mono text-sm"
            />
            <Button onClick={handleValidate} size="sm">Validate</Button>
          </div>
        </div>
        
        {result !== null && (
          <div className={`rounded-lg p-3 flex items-center gap-2 ${result ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'}`}>
            {result ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Valid ✓</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Invalid ✗</span>
              </>
            )}
          </div>
        )}

        <div>
          <p className="text-xs text-muted-foreground mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-1">
            {validator.examples.map((example, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => setInput(example)}
                className="text-xs font-mono h-7"
              >
                {example.length > 20 ? example.substring(0, 20) + '...' : example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ValidationUtilsPage() {
  return (
    <div className="relative flex flex-col pb-10">
      {/* Header */}
      <div className="border-b pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Validation Utilities</h1>
            <p className="text-muted-foreground">15 validators for email, URL, phone, passwords, and more</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Zero Dependencies</Badge>
          <Badge variant="secondary">15 Functions</Badge>
          <Badge variant="outline">@labs/utils/validation</Badge>
        </div>
      </div>

      {/* Installation */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900">
{`import { isEmail, isStrongPassword, isCreditCard } from '@labs/utils/validation'

// Or import from main package
import { isEmail } from '@labs/utils'`}
        </pre>
      </div>

      {/* Validators Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Interactive Validators</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {validators.map((validator, index) => (
            <ValidatorDemo key={index} validator={validator} />
          ))}
        </div>
      </div>

      {/* Special: Password Strength */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Password Strength Analyzer</h2>
        <PasswordStrengthDemo />
      </div>
    </div>
  )
}

function PasswordStrengthDemo() {
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState<string>("")

  const handleCheck = () => {
    if (password) {
      const result = validatePasswordStrength(password)
      setStrength(result)
    }
  }

  const strengthColors = {
    weak: "bg-red-500",
    fair: "bg-orange-500",
    good: "bg-yellow-500",
    strong: "bg-green-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">validatePasswordStrength()</CardTitle>
        <CardDescription>Get detailed password strength analysis (weak, fair, good, strong)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setStrength("")
            }}
            placeholder="Enter password to test..."
          />
          <Button onClick={handleCheck}>Analyze</Button>
        </div>

        {strength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${strengthColors[strength as keyof typeof strengthColors]}`}
                  style={{ width: strength === 'weak' ? '25%' : strength === 'fair' ? '50%' : strength === 'good' ? '75%' : '100%' }}
                />
              </div>
              <Badge className={strengthColors[strength as keyof typeof strengthColors]}>{strength.toUpperCase()}</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
