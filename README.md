<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/github-banner.png">

# 📜 iot-wol

THe goal of this project is to create a system for remotely turning on a computer from anywhere on the internet.
it works by using the capabilities of WOL (Wake-On-Lan) and extending it using IOT technologies

# 📌 Contents

- [Tech stack](#tech-stack)
  - [Web app](#web-app)
  - [IOT](#iot)
  - [Diagrams](#diagrams)
- [Introduction](#introduction)
  - [What is Wake-On-Lan ?](#what-is-wake-on-lan-)
  - [Wake-On-Lan Limitations](#wake-on-lan-limitations)
  - [Suggested solution](#suggested-solution)
- [How does the system work ?](#how-does-the-system-work-)
- [Building the WOL Controller](#building-the-wol-controller)
  - [Components](#components)
  - [Configuration](#configuration)
  - [Images](#images)
- [Web Client App](#web-client-app)
- [Enabling support for WOL](#enabling-support-for-wol)
  - [Enabling WOL in BIOS](#enabling-wol-in--bios)
  - [Enabling WOL in OS](#enabling-wol-in-os)
    - [Linux](#linux)
    - [Windows](#windows)

# Tech stack

## Web app

<p float="left">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/html.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/css.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/ts.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/tailwind.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/react.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/fontawesome.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/formik.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/i18n.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/tanstack-router.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/tanstack-query.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/rxdb.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/heroui.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/vite.svg">
</p>

## IOT

<p float="left">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/arduino.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/arduino-cloud.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/espressif.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/mqtt.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/amazon-alexa.svg">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/google-home.svg">
</p>

## Diagrams

<p float="left">
  <img height="50px" src="https://devlotfi.github.io/stack-icons/icons/drawio.svg">
</p>

# Introduction

## What is Wake-On-Lan ?

Wake-on-LAN (WoL) is a networking feature that allows a computer to be turned on or awakened remotely by sending a specially crafted network packet, known as a Magic Packet, to its network interface card (NIC). This packet contains the target machine’s MAC address repeated multiple times, enabling the NIC to recognize it even when the system is powered off (but still receiving standby power).
WoL is commonly used for remote management, automation, and energy saving — for example, to start a PC before a remote desktop session or scheduled task. It requires:

- A motherboard, NIC, and BIOS/UEFI that support WoL.
- WoL to be enabled in the BIOS/UEFI and/or operating system settings.
- The PC to remain connected to power and the network.

## Wake-On-Lan Limitations

Wake-on-LAN is generally limited to devices on the same local network (LAN) because the Magic Packet is typically sent as a broadcast, which most routers do not forward across the internet for security and routing reasons. While it is possible to wake a device over the internet (Wake-on-WAN) by configuring port forwarding, static IPs, or a VPN, this adds complexity and security considerations. As a result, WoL is most reliable and straightforward when used within the same LAN segment.

## Suggested solution

In this repo to bypass this limitations, we leveraged IOT technologies to help send a WOL packet in the LAN

# How does the system work ?

## MQTT Version

- We have an intermidiary device connected to the LAN that listens for an MQTT message on a cloud broker
- The client send the message to the broker from a client app
- When the message is recieved and validated, we send a WOL Packet on the lan to the target MAC adress
- We return an ACK message with a status to inform the user of the result of the operation

<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/working-diagram-mqtt.png">

## Arduino Cloud Version

- We have an intermidiary device connected to the LAN that listens for an trigger from Arduino Cloud
- The user uses Google Home / Amazon Alexa / Arduino Cloud Dashboard to trigger the action for a specific device
- When the message is recieved, we send a WOL Packet on the lan to the target device

<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/working-diagram-arduino-cloud.png">

# Building the WOL Controller

## Components

- ESP32
- Case (Optional)

## Configuration

### MQTT Version

Upload this script [script](https://github.com/devlotfi/iot-wol/blob/main/arduino/iot-wol-mqtt) and configure it to match your needs

### Arduino Cloud Version

Upload this script [script](https://github.com/devlotfi/iot-wol/blob/main/arduino/iot-wol-arduino-cloud) and configure it to match your needs

## Images

Some images of the final build

<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/build.jpg">

# Web Client App

There is also a web app client that uses **MQTT.js** that is deployed as a PWA on github pages [https://devlotfi.github.io/iot-wol/](https://devlotfi.github.io/iot-wol/) that allows you to manage multiple devices and send WOL requests messages to the mqtt broker

<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/preview-1.png">
<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/preview-2.png">
<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/preview-3.png">
<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/preview-4.png">
<img src="https://raw.githubusercontent.com/devlotfi/iot-wol/main/github-assets/preview-5.png">

# Enabling support for WOL

On most computers WOL is not enabled by default and you have to enable it in both BIOS and/or OS

## Enabling WOL in BIOS

The process of enabling WOL In BIOS can be different or may require extra steps depending on each motherboard

- Look for terminology such as "PCI Power up", "Allow PCI wake up event" or "Boot from PCI/PCI-E"
- You may need to disable power saving options (Example: On certain MSI motherboards disable EUP 2013)

## Enabling WOL in OS

### Linux

I suggest this [guide](https://wiki.archlinux.org/title/Wake-on-LAN)

### Windows

I suggest following the relevant parts of this [guide](https://www.windowscentral.com/software-apps/windows-11/how-to-enable-wake-on-lan-on-windows-11)
