import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp"

const meta = {
  title: "Forms/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputOTP>

const InputOTPDemo = () => {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <InputOTPDemo />,
  args: {
    maxLength: 6,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
}
