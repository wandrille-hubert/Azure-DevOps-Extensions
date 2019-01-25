[CmdletBinding()]
param()

Trace-VstsEnteringInvocation $MyInvocation # Trace verbose information when entering a function/script.
try 
{
	# Get task variables
    [bool]$debug = Get-VstsTaskVariable -Name System.Debug -AsBool

    # Get task configuration inputs
    [string]$firstName = Get-VstsInput -Name 'firstname' -Require
	[string]$lastName = Get-VstsInput -Name 'lastname'

	if ($lastName)
	{
		Write-Host "Hello $firstName $lastName."
		if ($debug)
		{
			Write-Verbose "Both inputs provided."
		}
	}
	else
	{
		Write-Host "Howdy $firstName."
		if ($debug)
		{
			Write-Verbose "One input provided."
		}
	}
} 
finally 
{
    Trace-VstsLeavingInvocation $MyInvocation # Trace verbose information when leaving a function/script.
}
 



