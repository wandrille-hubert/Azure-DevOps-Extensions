[CmdletBinding()]
param(
	[Parameter(Mandatory=$true,Position=1)]
    [string] $firstName,

    [Parameter(Mandatory=$false,Position=2)]
    [string] $lastName
)

try {
	if ($lastName) {
		Write-Host "Hello $firstName $lastName."
	}
	else {
		Write-Host "Howdy $firstName."
	}
} 
finally {
   Write-Host "Task completed."
}
 



