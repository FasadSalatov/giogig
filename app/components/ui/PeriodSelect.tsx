import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Period = "placeholder" | "24h" | "7d" | "30d" | "1y"

interface PeriodSelectProps {
  value: Period
  onValueChange: (value: Period) => void
}

export function PeriodSelect({ value, onValueChange }: PeriodSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-fit bg-gray-500/50 border-muted">
          <SelectValue placeholder="Выбрать период" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="placeholder" disabled>Выбрать период &nbsp;</SelectItem>
            <SelectItem value="24h">24 часа</SelectItem>
            <SelectItem value="7d">7 дней</SelectItem>
            <SelectItem value="30d">30 дней</SelectItem>
            <SelectItem value="1y">1 год</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
