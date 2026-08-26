import React from "react";

export type IndustryData = {
  hero: {
    title?: string;
    description: string;
    imageSrc: string | { src: string; alt: string }[];
    buttonText: string;
  };
  sections: Array<{
    title: React.ReactNode;
    content: React.ReactNode;
    imageSrc: string;
  }>;
};

export const industriesData: Record<string, IndustryData> = {
  healthcare: {
    hero: {
      description:
        "Protect your practice with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeEnterprise 400 delivers enterprise-grade cybersecurity, designed to safeguard electronic health records (EHRs), patient data, and critical medical systems. With simplified deployment and AI-powered threat detection, SafeEnterprise 400 ensures providers can swiftly implement comprehensive cybersecurity measures, protecting sensitive information and maintaining compliance with HIPAA and other regulatory standards.",
      buttonText: "Learn more about SafeEnterprise 400",
      imageSrc: [
        {
          src: "/images/marma-dashboard/alerts.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/home/Security_Images (3).webp",
          alt: "Healthcare dashboard",
        },
      ],
    },
    sections: [
      {
        title: (
          <>
            Phishing Scams in Healthcare: A Leading Cause of Data Breaches and
            Hacking
          </>
        ),
        content: (
          <>
            Phishing attacks are one of the most common cyber threats in the
            industry, where cybercriminals impersonate trusted entities to steal
            login credentials and access
            <br />. patient records. These attacks exploit human error,
            bypassing IT security defenses and leading to breaches that expose
            sensitive medical data.
            <br />
            <br />
            In 2025, 45% of cybersecurity professionals reported that phishing
            was responsible for their most severe breach (HIPAA Journal). With
            92% of providers experiencing at least one cyber attack, phishing
            remains a primary entry point.
            <br />
            <br />
            Marma SafeBiz provides cybersecurity solutions, offering AI-driven
            phishing detection and network security to prevent breaches. Enhance
            security and stop phishing before it compromises patient
            trust—secure your systems today.
          </>
        ),
        imageSrc: "/images/solutions/healthCare/1.webp",
      },
      {
        title: (
          <>
            Patient Data Protection:
            <br />
            Safeguarding Security
          </>
        ),
        content: (
          <>
            Data is one of the most valuable targets for cybercriminals, making
            IT security a critical concern. Breaches in network security expose
            sensitive records, leading to identity theft, fraud, and compliance
            violations. In 2025, data breaches exposed over 45 million records,
            the highest since 2015, with incidents increasing yearly (UpGuard).
            <br />
            <br />
            92% of patients believe their data should be protected and not sold,
            highlighting growing concerns over security (AMA). Marma SafeBiz
            provides cybersecurity solutions, offering secure data storage,
            encryption, and real-time monitoring to prevent cyberattacks.
            Protect privacy before a breach happens—secure your systems today.
          </>
        ),
        imageSrc: "/images/solutions/healthCare/2.webp",
      },
      {
        title: (
          <>Growing Internet Connected Devices and Breaches: The Hidden Risk</>
        ),
        content: (
          <>
            The industry is a prime target for cyber threats, with records,
            devices, and billing systems at constant risk. A single breach can
            compromise sensitive information, disrupt operations, and lead to
            costly legal consequences.
            <br />
            <br />
            SafeBiz provides enterprise-grade cybersecurity tailored for
            clinics, hospitals, and offices, securing all connected
            devices—including databases, IoT equipment, and administrative
            systems. With AI-powered protection, no software installation, and
            seamless integration, SafeBiz ensures compliance and uninterrupted
            care. Keep your clients' trust and your practice secure because
            safety goes beyond physical walls.
          </>
        ),
        imageSrc: "/images/solutions/healthCare/3.webp",
      },
      {
        title: (
          <>
            Fighting Back Against
            <br />
            Ransomware Attacks
          </>
        ),
        content: (
          <>
            Ransomware is a type of malicious software that locks systems,
            encrypts records, and demands payment for access. With organizations
            relying on network security to safeguard sensitive data, a single
            attack can lead to breaches, legal violations, and financial losses.
            <br />
            <br />
            In 2025, 67% of organizations were hit by ransomware, a four-year
            high, while recovery times have doubled, with only 22% of victims
            restoring systems within a week (Sophos). The average cost of a
            breach reached $9.8 million, making hacking one of the most
            expensive cyber risks (Healthcare Dive).
            <br />
            <br />
            Marma SafeBiz provides cybersecurity, offering real-time ransomware
            detection, data encryption, and secure network solutions to prevent
            breaches. Defend your systems before cybercriminals take control.
          </>
        ),
        imageSrc: "/images/solutions/healthCare/4.webp",
      },
    ],
  },
  legal: {
    hero: {
      description:
        "Protect your legal practice with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeEnterprise 200 delivers enterprise-grade cybersecurity, designed to safeguard sensitive client information, case files, and critical legal systems. With simplified deployment and AI-powered threat detection, SafeEnterprise 200 ensures law firms can swiftly implement comprehensive cybersecurity measures, protecting confidential data and maintaining compliance with attorney-client privilege and other regulatory standards.",
      imageSrc: [
        {
          src: "/images/marma-dashboard/email_protection.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/home/Security_Images (2).webp",
          alt: "Healthcare dashboard",
        },
      ],
      buttonText: "Learn more about SafeEnterprise 200",
    },
    sections: [
      {
        title: (
          <>
            Phishing Scams in Legal: A Leading Cause of Data Breaches and
            Hacking
          </>
        ),
        content: (
          <>
            Phishing attacks are one of the{" "}
            <strong>most common cyber threats</strong> in the legal industry,
            where cybercriminals <strong>impersonate trusted entities</strong>{" "}
            to steal login credentials and access{" "}
            <strong>client records</strong>. These attacks exploit human error,
            bypassing <strong>legal IT security</strong> defenses and leading to{" "}
            <strong>data breaches</strong> that expose sensitive case files.
            <br />
            <br />
            In 2025, 45% of legal cybersecurity professionals reported that
            phishing was responsible for their most severe{" "}
            <strong>breach in legal</strong> (HIPAA Journal). With{" "}
            <strong>92%</strong> of legal providers experiencing at least one{" "}
            <strong>cyber attack in legal</strong>, phishing remains a{" "}
            <strong>primary entry point</strong>.<br />
            <br />
            Marma SafeBiz provides{" "}
            <strong>legal cybersecurity solutions</strong>, offering{" "}
            <strong>AI-driven phishing detection</strong> and{" "}
            <strong>network security in legal</strong> to prevent{" "}
            <strong>data breaches</strong>. Enhance{" "}
            <strong>security in legal</strong> and stop phishing before it
            compromises client trust—secure your systems today.
          </>
        ),
        imageSrc: "/images/solutions/legal/1.webp",
      },
      {
        title: (
          <>
            Client Data Protection:
            <br />
            Safeguarding Legal Security
          </>
        ),
        content: (
          <>
            Client data is one of the <strong>most valuable targets</strong> for
            cybercriminals, making <strong>legal IT security</strong> a critical
            concern. Breaches in <strong>network security in legal</strong>{" "}
            expose sensitive <strong>case records</strong>, leading to{" "}
            <strong>identity theft, fraud, and compliance violations</strong>.
            In 2025, legal data breaches exposed over 45 million records, the
            highest since 2015, with incidents increasing yearly (UpGuard).
            <br />
            <br />
            <strong>92%</strong> of clients believe their data should be
            protected and not sold, highlighting growing concerns over{" "}
            <strong>security in legal</strong> (AMA). Marma SafeBiz provides{" "}
            <strong>legal cybersecurity solutions</strong>, offering{" "}
            <strong>secure client data storage</strong>, encryption, and{" "}
            <strong>real-time monitoring</strong> to prevent{" "}
            <strong>cyberattacks on legal</strong>. Protect client privacy
            before a breach happens—secure your systems today.
          </>
        ),
        imageSrc: "/images/solutions/legal/2.webp",
      },
      {
        title: (
          <>
            Growing Internet Connected Devices and Legal Breaches:
            <br />
            The Hidden Risk
          </>
        ),
        content: (
          <>
            The legal industry is a prime target for cyber threats, with client
            records, devices, and billing systems at constant risk. A single
            breach can compromise sensitive client information, disrupt
            operations, and lead to costly legal consequences.
            <br />
            <br />
            <strong>SafeBiz</strong> provides{" "}
            <strong>enterprise-grade cybersecurity</strong> tailored for law
            firms, legal offices, and corporate legal departments, securing all
            connected devices—including client databases, IoT office equipment,
            and administrative systems. With{" "}
            <strong>AI-powered protection</strong>, no software installation,
            and seamless integration, SafeBiz ensures compliance and
            uninterrupted operations.{" "}
            <strong>
              Keep your clients' trust and your practice secure because in
              legal, safety goes beyond physical walls.
            </strong>
          </>
        ),
        imageSrc: "/images/solutions/legal/3.webp",
      },
      {
        title: (
          <>
            Fighting Back Against
            <br />
            Ransomware Attacks
          </>
        ),
        content: (
          <>
            Ransomware is a type of <strong>malicious software</strong> that
            locks law firm systems, encrypts <strong>client records</strong>,
            and demands payment for access. With legal organizations relying on{" "}
            <strong>network security in legal</strong> to safeguard sensitive
            data, a single attack can lead to <strong>data breaches</strong>,
            legal violations, and financial losses.
            <br />
            <br />
            In 2025, <strong>67% of legal organizations</strong> were hit by
            ransomware, a four-year high, while{" "}
            <strong>recovery times have doubled</strong>, with only 22% of
            victims restoring systems within a week (Sophos). The{" "}
            <strong>average cost of a legal breach reached $9.8 million</strong>
            , making <strong>hacking in legal</strong> one of the most expensive
            cyber risks (Healthcare Dive).
            <br />
            <br />
            Marma SafeBiz provides <strong>legal cybersecurity</strong>,
            offering <strong>real-time ransomware detection</strong>, data
            encryption, and <strong>secure network solutions</strong> to prevent{" "}
            <strong>breach in legal</strong>. Defend your systems before
            cybercriminals take control.
          </>
        ),
        imageSrc: "/images/solutions/legal/4.webp",
      },
    ],
  },
  finance: {
    hero: {
      description:
        "Protect your financial practice with comprehensive protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), social engineering and other cyber attacks. Marma Security SafeEnterprise 400 offers enterprise-grade cybersecurity that is simplified to ensure financial customers can deploy comprehensive cybersecurity measures swiftly, safeguarding their sensitive data and maintaining operational integrity.",
      imageSrc: [
        {
          src: "/images/marma-dashboard/firewall_fleet.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/solutions/finance/0.webp",
          alt: "Healthcare dashboard",
        },
      ],
      buttonText: "Learn more about SafeEnterprise 400",
    },
    sections: [
      {
        title: <>Protection from Phishing Attacks</>,
        content: (
          <>
            Phishing attacks are the <strong>#1 cybersecurity threat</strong> to
            the <strong>finance industry</strong>, with cybercriminals using
            deceptive emails and impersonation tactics to steal sensitive data.
            In 2025, financial institutions were the target of 13% of phishing
            attacks worldwide, and the finance and insurance industry was the
            most targeted industry. Nearly{" "}
            <strong>46% of all cyber breaches</strong> in the sector are caused
            by these scams—leading to an average loss of{" "}
            <strong>$4.9 million per incident</strong>. Attackers exploit{" "}
            <strong>legitimate domains</strong>, impersonate executives through{" "}
            <strong>business email compromise (BEC)</strong>, and use{" "}
            <strong>social engineering</strong> to bypass traditional security.
            <br />
            <br />
            With <strong>Marma SafeBiz</strong>, you can{" "}
            <strong>stop phishing before it happens</strong>. Our{" "}
            <strong>cybersecurity solutions for the financial customers</strong>{" "}
            provide real-time phishing threat detection,{" "}
            <strong>cloud security for financial services</strong>, and
            proactive <strong>financial data protection</strong>—keeping your
            institution's data, assets, and reputation safe.{" "}
            <strong>
              Don't become a victim of a phishing attack—secure your business
              today.
            </strong>
          </>
        ),
        imageSrc: "/images/solutions/finance/1.webp",
      },
      {
        title: <>Don't Be Held For Ransom By Ransomware</>,
        content: (
          <>
            Ransomware attacks are one of the most{" "}
            <strong>devastating threats to the finance industry</strong>, with
            hackers encrypting critical systems and demanding massive ransom
            payments. In{" "}
            <strong>
              2025, ransomware attacks on financial institutions increased by
              74%
            </strong>
            , causing severe operational disruptions and financial losses
            (BlackFog). The average cost of a ransomware attack in the sector
            exceeded <strong>$5.97 million</strong>, including ransom payments,
            downtime, and recovery expenses (IBM Cost of a Data Breach Report
            2025). Cybercriminals now use{" "}
            <strong>double extortion tactics</strong>, where they{" "}
            <strong>
              steal financial data before encrypting it, threatening to leak it
              unless paid
            </strong>
            —putting <strong>financial services security</strong> at serious
            risk (Sophos 2025 Ransomware Report).
            <br />
            <br />
            With <strong>Marma SafeBiz</strong>, you can{" "}
            <strong>stay protected from ransomware threats</strong>. Our{" "}
            <strong>financial sector cybersecurity</strong> solutions provide{" "}
            <strong>
              real-time ransomware detection, cloud security for financial
              services, and data protection
            </strong>{" "}
            to safeguard your institution against costly breaches.{" "}
            <strong>
              Don't let ransomware hold your business hostage—protect your
              assets today.
            </strong>
          </>
        ),
        imageSrc: "/images/solutions/finance/2.webp",
      },
      {
        title: <>Protection from Advanced Persistent Threats (APTs)</>,
        content: (
          <>
            <strong>Advanced Persistent Threats (APTs)</strong> pose significant
            challenges to the financial industry due to their stealthy and
            prolonged nature. These sophisticated cyberattacks involve
            unauthorized entities infiltrating networks and remaining undetected
            for extended periods, aiming to steal sensitive data or disrupt
            operations. In 2025, data breaches resulting from such attacks
            accounted for <strong>80% of cybersecurity incidents</strong> in the
            financial sector, marking a{" "}
            <strong>25 percentage point increase</strong> compared to the
            previous year, underscoring the escalating threat these actors pose
            to financial institutions.
            <br />
            <br />
            Marma Security's{" "}
            <strong>
              SafeBiz offers robust protection against APTs, tailored
              specifically for small to medium-sized financial businesses
            </strong>
            . SafeBiz features continuous network monitoring, advanced threat
            detection, and automated response capabilities, effectively
            identifying and neutralizing potential APT intrusions before they
            can cause harm.
          </>
        ),
        imageSrc: "/images/solutions/finance/3.webp",
      },
      {
        title: <>Protection from Social Engineering Attacks</>,
        content: (
          <>
            Social engineering is one of the most{" "}
            <strong>dangerous cyber threats</strong> in the{" "}
            <strong>financial sector</strong>, targeting{" "}
            <strong>finance professionals</strong> to bypass{" "}
            <strong>financial data security</strong>. Attackers use{" "}
            <strong>
              phishing emails, impersonation scams, and fraudulent requests
            </strong>{" "}
            to steal credentials, gain unauthorized access, or manipulate
            financial transactions thus making{" "}
            <strong>cyber security for finance professionals</strong> and{" "}
            <strong>secure banking solutions</strong> more critical than ever.
            <br />
            <br />
            In{" "}
            <strong>
              2025, 85% of organizations faced social engineering attacks
            </strong>
            , a <strong>16% rise</strong> from the previous year (CISO). With{" "}
            <strong>89% of attacks being financially motivated</strong>, the
            finance sector remains a prime target (SecureFrame). With{" "}
            <strong>Marma SafeBiz</strong>, financial customers can greatly{" "}
            <strong>enhance cybersecurity in financial services</strong>.
          </>
        ),
        imageSrc: "/images/solutions/finance/4.webp",
      },
    ],
  },
  manufacturing: {
    hero: {
      description:
        "Protect your manufacturing operations with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeEnterprise 200 delivers enterprise-grade cybersecurity, designed to safeguard intellectual property, production systems, and supply chain data. With simplified deployment and AI-powered threat detection, SafeEnterprise 200 ensures manufacturers can swiftly implement comprehensive cybersecurity measures, protecting critical infrastructure, preventing downtime, and maintaining compliance with industry standards such as NIST and ISO 27001.",
      imageSrc: [
        {
          src: "/images/marma-dashboard/enterprise_protection.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/home/Security_Images (1).webp",
          alt: "Healthcare dashboard",
        },
      ],
      buttonText: "Learn more about SafeEnterprise 200",
    },
    sections: [
      {
        title: (
          <>
            Ransomware Attacks: A Critical Threat to Manufacturing and Logistics
          </>
        ),
        content: (
          <>
            <strong>Ransomware attacks</strong> are one of the biggest{" "}
            <strong>cybersecurity threats in manufacturing</strong>, disrupting
            production lines, supply chains, and{" "}
            <strong>secure manufacturing</strong> operations. Cybercriminals
            target <strong>critical manufacturing sectors</strong>, encrypting
            vital data and demanding ransom payments, leading to costly downtime
            and financial losses. Without strong{" "}
            <strong>cybersecurity for manufacturing companies</strong>,
            businesses risk prolonged shutdowns and operational failures.
            <br />
            <br />
            In 2025,{" "}
            <strong>
              over 54% of all cyberattacks in the manufacturing sector were
              ransomware-related
            </strong>
            , causing operational delays and production losses (Waterfall
            Security). Additionally,{" "}
            <strong>
              72% of businesses worldwide were impacted by ransomware attacks
            </strong>
            , with <strong>manufacturing security</strong> emerging as a primary
            concern (Sangfor). Weak <strong>industrial cyber security</strong>{" "}
            measures and poor <strong>maintenance cyber discipline</strong>{" "}
            leave companies vulnerable to these attacks.
            <br />
            <br />
            Marma SafeBiz provides{" "}
            <strong>cybersecurity for manufacturers</strong>, offering{" "}
            <strong>best ransomware protection</strong>,{" "}
            <strong>industrial cyber security solutions</strong>, and{" "}
            <strong>cyber security for manufacturing</strong> to protect against
            encryption-based attacks. Strengthen your{" "}
            <strong>cyber manufacturing</strong> defenses with{" "}
            <strong>enterprise cybersecurity</strong> and real-time{" "}
            <strong>threat detection</strong> today!
          </>
        ),
        imageSrc: "/images/solutions/manufacturing/1.webp",
      },
      {
        title: (
          <>
            Phishing and Social Engineering: The Hidden Cyber Threat in
            Logistics and Manufacturing
          </>
        ),
        content: (
          <>
            <strong>Phishing attacks in logistics cybersecurity</strong> and{" "}
            <strong>manufacturing cybersecurity</strong> remain one of the most
            effective entry points for cybercriminals. Attackers impersonate
            executives or suppliers to manipulate employees into granting
            unauthorized access to sensitive systems, jeopardizing{" "}
            <strong>cybersecurity in the manufacturing industry</strong> and{" "}
            <strong>data protection for logistics transport</strong>.<br />
            <br />
            In 2025,{" "}
            <strong>94% of organizations faced phishing attacks</strong>, and{" "}
            <strong>
              53% of ransomware infections in manufacturing originated from
              phishing emails
            </strong>{" "}
            (Infosecurity Magazine, Program Business). Poor{" "}
            <strong>security manufacturing</strong> practices and lack of{" "}
            <strong>cybersecurity training</strong> make employees the weakest
            link in <strong>cybersecurity logistics</strong> operations.
            <br />
            <br />
            Marma SafeBiz provides <strong>phishing security</strong> and email
            fraud protection, offering <strong>logistics cybersecurity</strong>{" "}
            and <strong>cybersecurity for manufacturing</strong> to prevent
            phishing-based breaches. Secure your{" "}
            <strong>cyber supply chain</strong> today with{" "}
            <strong>cyber industry disruption protection</strong> and proactive{" "}
            <strong>threat detection cyber security</strong> solutions.
          </>
        ),
        imageSrc: "/images/solutions/manufacturing/2.webp",
      },
      {
        title: (
          <>
            Supply Chain Attacks: Managing Cybersecurity Risks in Logistics and
            Manufacturing
          </>
        ),
        content: (
          <>
            <strong>Supply chain cyber security</strong> is increasingly under
            threat, with cybercriminals exploiting weak{" "}
            <strong>supply chain cyber risk management</strong> strategies to
            disrupt operations. From <strong>cyber factories</strong> to{" "}
            <strong>logistics cybersecurity</strong>, businesses must implement
            strong defenses to mitigate{" "}
            <strong>supply chain cyber security risks</strong> and ensure
            business continuity.
            <br />
            <br />
            The number of supply chain cyber attacks increased by more than{" "}
            <strong>2,600% since 2018</strong>, with over{" "}
            <strong>54 million victims in 2025</strong> alone (Foley). Annual
            losses from cyber supply chain disruptions now exceed{" "}
            <strong>$82 million per organization</strong>, highlighting the
            importance of <strong>cyber supply chain risk management</strong>{" "}
            (Foley).
            <br />
            <br />
            Marma SafeBiz enhances{" "}
            <strong>supply chain cyber security risk management</strong>,
            offering{" "}
            <strong>cyber supply chain risk assessment processes</strong> and{" "}
            <strong>cybersecurity for logistics</strong> to protect against
            growing threats. Ensure a <strong>secure manufacturing</strong>{" "}
            process with <strong>supply chain cyber security solutions</strong>{" "}
            tailored for your industry.
          </>
        ),
        imageSrc: "/images/solutions/manufacturing/3.webp",
      },
      {
        title: (
          <>
            Legacy Systems and IoT Vulnerabilities: The Weak Link in Cyber
            Manufacturing
          </>
        ),
        content: (
          <>
            The reliance on{" "}
            <strong>legacy industrial control systems (ICS)</strong> and the
            rise of <strong>cyber manufacturing</strong> have created new
            security gaps in <strong>manufacturing cybersecurity</strong>.
            Outdated software and insecure IoT devices expose{" "}
            <strong>cyber factories</strong> to cyber threats, increasing{" "}
            <strong>cybersecurity supply chain risks</strong> and leaving
            businesses unprepared for evolving attacks.
            <br />
            <br />
            The manufacturing sector remains one of the top three most targeted
            industries for cyberattacks, with outdated ICS and IoT
            vulnerabilities responsible for <strong>
              32% of incidents
            </strong>{" "}
            (CSO Online). Cybercriminals exploit these weaknesses to disrupt
            critical <strong>manufacturing sector</strong> operations, leading
            to costly downtime and compliance risks.
            <br />
            <br />
            Marma SafeBiz helps implement{" "}
            <strong>cybersecurity in cyber factories</strong>, providing{" "}
            <strong>industrial cyber security solutions</strong>,{" "}
            <strong>cyber supply chain risk assessment processes</strong>, and{" "}
            <strong>security manufacturing corp protection</strong>. Upgrade
            your <strong>manufacturing security</strong> today to defend against{" "}
            <strong>cybersecurity supply chain risks</strong> and future-proof
            your operations.
          </>
        ),
        imageSrc: "/images/solutions/manufacturing/4.webp",
      },
    ],
  },
  "small-and-medium-business": {
    hero: {
      description:
        "Protect your small or medium-sized business (SMB) with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeBiz delivers enterprise-grade cybersecurity, designed to safeguard customer data, financial transactions, and business operations. With simplified deployment and AI-powered threat detection, SafeBiz ensures SMBs can swiftly implement comprehensive cybersecurity measures, protecting sensitive information, preventing costly downtime, and maintaining compliance with industry security standards.",
      imageSrc: [
        {
          src: "/images/marma-dashboard/security_agent.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/solutions/smb/0.webp",
          alt: "Healthcare dashboard",
        },
      ],
      buttonText: "Learn more about SafeBiz",
    },
    sections: [
      {
        title: (
          <>
            Phishing and Social Engineering Attacks: A Major Cybersecurity
            Threat to Small Businesses
          </>
        ),
        content: (
          <>
            <strong>Phishing attacks in cyber security</strong> are among the
            most prevalent <strong>cyber threats to small businesses</strong>,
            tricking employees into revealing sensitive information or clicking
            malicious links. Without{" "}
            <strong>cybersecurity for small businesses</strong>, these scams can
            lead to <strong>email fraud</strong>, financial losses, and data
            breaches, putting <strong>business computer security</strong> at
            risk. In 2025,{" "}
            <strong>94% of organizations experienced phishing attacks</strong>,
            with <strong>96% suffering negative impacts</strong> as a result
            (Infosecurity Magazine). Additionally,{" "}
            <strong>
              phishing was the initial entry point in 53% of ransomware attacks
            </strong>{" "}
            on small businesses (Program Business). SMBs are especially
            vulnerable due to inadequate{" "}
            <strong>small business cybersecurity solutions</strong> and lack of{" "}
            <strong>phishing security</strong> awareness.
            <br />
            <br />
            Marma SafeBiz offers <strong>cybersecurity for SMBs</strong>,
            providing <strong>email phishing protection</strong>,{" "}
            <strong>threat detection cyber security</strong>, and{" "}
            <strong>ransomware protection</strong> to safeguard your business.
            Stay ahead of{" "}
            <strong>cyber security threats for small businesses</strong> with
            real-time monitoring and{" "}
            <strong>small business network security solutions</strong>. Prevent
            phishing, avoid email fraud, and secure your business today!
          </>
        ),
        imageSrc: "/images/solutions/smb/1.webp",
      },
      {
        title: (
          <>
            Ransomware Attacks: A Growing Threat to Small and Medium-Sized
            Businesses (SMBs)
          </>
        ),
        content: (
          <>
            <strong>Ransomware attacks</strong> have become a significant
            concern for{" "}
            <strong>small and medium-sized enterprises (SMEs)</strong>, where
            malicious actors encrypt critical data and demand payment for its
            release. Without robust <strong>cybersecurity measures</strong>,
            SMEs face operational disruptions, financial losses, and
            reputational harm.
            <br />
            <br />
            In 2025, ransomware attacks surged by 95% compared to 2022,
            affecting over 72% of businesses globally. Notably,{" "}
            <strong>
              82% of these attacks targeted companies with fewer than 1,000
              employees
            </strong>{" "}
            (Sangfor), and{" "}
            <strong>
              37% impacted businesses with fewer than 100 employees
            </strong>{" "}
            (StrongDM). This trend underscores the vulnerability of SMEs, often
            due to inadequate <strong>cybersecurity strategies</strong> and
            limited resources.
            <br />
            <br />
            Marma SafeBiz offers comprehensive{" "}
            <strong>cybersecurity solutions</strong> tailored for SMEs,
            including advanced <strong>ransomware protection</strong>,{" "}
            <strong>threat detection</strong>, and{" "}
            <strong>network security services</strong>. By implementing
            proactive measures, Marma Safe Biz helps{" "}
            <strong>prevent ransomware attacks</strong>, ensuring business
            continuity and safeguarding your organization's reputation.{" "}
            <strong>Secure your business today!</strong>
          </>
        ),
        imageSrc: "/images/solutions/smb/2.webp",
      },
      {
        title: <>Malware Infections: A Persistent Threat to Small Businesses</>,
        content: (
          <>
            <strong>Malware infections</strong> remain a significant{" "}
            <strong>cybersecurity threat</strong> for{" "}
            <strong>small and medium-sized enterprises (SMEs)</strong>.
            Malicious software can infiltrate systems, leading to data breaches,
            financial losses, and operational disruptions. Without robust{" "}
            <strong>cybersecurity for SMBs</strong>, businesses are particularly
            vulnerable to these attacks.{" "}
            <strong>
              In 2025, the global number of malware attacks reached 6.06
              billion, marking a 10% increase from the previous year
            </strong>{" "}
            (Statista).{" "}
            <strong>
              Small businesses accounted for 45% of reported malware incidents
              in the second quarter of 2025, with 37% requiring over a week to
              restore operations
            </strong>{" "}
            (ControlD). Limited IT security for small businesses and lack of
            small business cybersecurity solutions make them easy targets.
            <br />
            <br />
            Marma SafeBiz provides cybersecurity for SMBs, offering threat
            detection cyber security, network security products, and business
            cyber security solutions to prevent malware infections. With
            enterprise cybersecurity solutions and small business network
            security solutions, Marma Safe Biz ensures data security for small
            businesses and protection from evolving threats. Secure your
            business today!
          </>
        ),
        imageSrc: "/images/solutions/smb/3.webp",
      },
      {
        title: <>Business Email Compromise (BEC)</>,
        content: (
          <>
            <strong>Business Email Compromise (BEC)</strong> is an escalating{" "}
            <strong>cybersecurity threat</strong> where attackers impersonate
            trusted contacts to deceive businesses into transferring funds or
            divulging sensitive information. Without effective{" "}
            <strong>email security measures</strong>, SMEs are at heightened
            risk of these sophisticated scams. Between{" "}
            <strong>
              October 2013 and December 2025, global losses due to BEC scams
              totaled over $55 billion
            </strong>{" "}
            (IC3.gov). The{" "}
            <strong>
              average loss per incident in 2025 was approximately $137,000
            </strong>
            , underscoring the severe financial impact on businesses (The
            Australian). Weak <strong>IT security for small businesses</strong>{" "}
            and lack of <strong>business computer security</strong> make
            companies prime targets for these scams.
            <br />
            <br />
            Marma Safe Biz provides <strong>cybersecurity for SMBs</strong>,
            offering <strong>email phishing protection</strong>,{" "}
            <strong>threat detection cyber security</strong>, and{" "}
            <strong>business cyber security solutions</strong> to protect
            against <strong>BEC threats</strong>. With{" "}
            <strong>small business network security solutions</strong>, Marma
            Safe Biz ensures <strong>email fraud prevention</strong> and secures
            financial assets. <strong>Fortify your defenses today!</strong>
          </>
        ),
        imageSrc: "/images/solutions/smb/4.webp",
      },
    ],
  },
  education: {
    hero: {
      description:
        "Protect your educational institution with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeEnterprise 100 delivers enterprise-grade cybersecurity, designed to safeguard student records, research data, and campus networks. With simplified deployment and AI-powered threat detection, SafeEnterprise 100 ensures schools, colleges, and universities can swiftly implement comprehensive cybersecurity measures, protecting sensitive information, preventing disruptions to learning, and maintaining compliance with FERPA and other data privacy regulations.",
      imageSrc: [
        {
          src: "/images/marma-dashboard/cloud_data_protection.webp",
          alt: "Compliance reporting",
        },
        {
          src: "/images/marma-dashboard/endpoint_protection.webp",
          alt: "Patient data protection",
        },
        {
          src: "/images/home/Security_Images (6).webp",
          alt: "Healthcare dashboard",
        },
      ],
      buttonText: "Learn more about SafeEnterprise 100",
    },
    sections: [
      {
        title: (
          <>
            Phishing and Social Engineering: The Top Cyber Threat Targeting
            Educational Institutions
          </>
        ),
        content: (
          <>
            <strong>Phishing attacks</strong> are the most prevalent{" "}
            <strong>cyber threat facing educational institutions</strong>, with
            cybercriminals targeting students, faculty, and administrative staff
            through deceptive emails, fake login portals, and impersonation
            scams. Schools and universities hold vast amounts of{" "}
            <strong>personally identifiable information (PII)</strong>, making
            them lucrative targets. In 2025,{" "}
            <strong>
              90% of higher education institutions reported being targeted by
              phishing campaigns
            </strong>{" "}
            (Educause). Additionally,{" "}
            <strong>
              the education sector experienced a 44% increase in social
              engineering attacks
            </strong>{" "}
            compared to the previous year, with attackers exploiting the open,
            collaborative nature of academic environments (Verizon DBIR 2025).
            <br />
            <br />
            Marma SafeBiz provides{" "}
            <strong>cybersecurity for educational institutions</strong>,
            offering <strong>AI-driven phishing detection</strong>,{" "}
            <strong>email security</strong>, and{" "}
            <strong>real-time threat monitoring</strong> to protect campus
            networks. Safeguard your students, faculty, and research data—
            <strong>secure your institution today.</strong>
          </>
        ),
        imageSrc: "/images/solutions/education/1.webp",
      },
      {
        title: <>Ransomware in Education: Locking Down Learning</>,
        content: (
          <>
            <strong>Ransomware attacks</strong> have surged across the{" "}
            <strong>education sector</strong>, crippling school operations, exam
            systems, and administrative networks. Cybercriminals exploit
            outdated infrastructure and limited IT budgets to encrypt critical
            data and demand massive ransom payments. In{" "}
            <strong>
              2025, 80% of K-12 schools and 79% of higher education institutions
              reported ransomware attacks
            </strong>
            , the highest rate across all industries surveyed (Sophos). The{" "}
            <strong>
              average cost of recovery for an educational institution reached
              $1.42 million
            </strong>
            , including downtime, data restoration, and reputational damage.
            With{" "}
            <strong>
              only 4% of education victims able to recover within a day
            </strong>
            , the operational impact is devastating.
            <br />
            <br />
            Marma SafeBiz offers{" "}
            <strong>ransomware protection for schools and universities</strong>,
            providing <strong>real-time ransomware detection</strong>,{" "}
            <strong>automated backup solutions</strong>, and{" "}
            <strong>network security</strong> to ensure uninterrupted learning.{" "}
            <strong>
              Don't let ransomware shut down your campus—protect your
              institution today.
            </strong>
          </>
        ),
        imageSrc: "/images/solutions/education/2.webp",
      },
      {
        title: (
          <>
            Student Data Protection:
            <br />
            Safeguarding Privacy and Compliance
          </>
        ),
        content: (
          <>
            Educational institutions manage enormous volumes of{" "}
            <strong>sensitive student data</strong>—including academic records,
            financial aid information, Social Security numbers, and health
            records—making them a{" "}
            <strong>high-value target for cybercriminals</strong>. A single
            breach can expose thousands of students to{" "}
            <strong>
              identity theft, fraud, and long-term privacy violations
            </strong>
            .<br />
            <br />
            In 2025,{" "}
            <strong>over 36 million student records were exposed</strong>{" "}
            through data breaches in the education sector (Comparitech).
            Compliance with{" "}
            <strong>FERPA (Family Educational Rights and Privacy Act)</strong>{" "}
            requires institutions to implement adequate safeguards, yet{" "}
            <strong>
              only 25% of universities have a dedicated cybersecurity team
            </strong>{" "}
            (Educause). Failure to protect student data can result in federal
            funding loss and legal liability.
            <br />
            <br />
            Marma SafeBiz provides{" "}
            <strong>data protection for educational institutions</strong>,
            offering <strong>encrypted data storage</strong>,{" "}
            <strong>access control management</strong>, and{" "}
            <strong>continuous compliance monitoring</strong> to meet{" "}
            <strong>FERPA, COPPA, and state-level privacy standards</strong>.
            Protect student privacy before a breach happens—
            <strong>secure your systems today.</strong>
          </>
        ),
        imageSrc: "/images/solutions/education/3.webp",
      },
      {
        title: (
          <>
            Campus Network Vulnerabilities:
            <br />
            Securing the Connected Classroom
          </>
        ),
        content: (
          <>
            Modern campuses are <strong>hyper-connected environments</strong>{" "}
            with thousands of IoT devices, BYOD laptops, smart classroom
            equipment, and research lab systems all sharing a single network.
            This massive <strong>attack surface</strong> makes universities and
            schools uniquely vulnerable to{" "}
            <strong>
              lateral movement attacks, DDoS disruptions, and unauthorized
              access
            </strong>
            .<br />
            <br />
            The education sector experienced{" "}
            <strong>2,507 cyberattacks per institution per week in 2025</strong>
            , a <strong>12% increase</strong> from the previous year—making it
            the most attacked industry globally (Check Point Research).{" "}
            <strong>
              Unsecured IoT devices accounted for 34% of network intrusions
            </strong>{" "}
            in academic environments, while{" "}
            <strong>BYOD policies without proper endpoint security</strong>{" "}
            created persistent vulnerabilities across campus networks.
            <br />
            <br />
            Marma SafeBiz delivers{" "}
            <strong>network security for educational institutions</strong>,
            featuring <strong>zero-trust architecture</strong>,{" "}
            <strong>IoT device monitoring</strong>, and{" "}
            <strong>endpoint protection</strong> to secure every device on
            campus. With seamless integration and no software installation
            required, SafeBiz keeps your{" "}
            <strong>
              connected classroom safe without disrupting learning
            </strong>
            . <strong>Future-proof your campus security today.</strong>
          </>
        ),
        imageSrc: "/images/solutions/education/4.webp",
      },
    ],
  },
  residential: {
    hero: {
      title:
        "Cybersecurity Solutions for Residential and Commercial Properties",
      description:
        "Protect your residential and commercial properties with advanced protection from Phishing, Ransomware, Advanced Persistent Threats (APTs), Social Engineering, and other cyber threats. Marma Security SafeBiz delivers enterprise-grade cybersecurity designed to safeguard smart building systems, tenant data, surveillance networks, and access control infrastructure. With simplified deployment and AI-powered threat detection, SafeBiz ensures property managers, real estate operators, and facility owners can secure connected systems, prevent unauthorized access, and maintain compliance with modern security standards.",
      imageSrc: "/images/solutions/residential/0.webp",
      buttonText: "Learn more about SafeBiz",
    },
    sections: [
      {
        title: <>Smart Building Vulnerabilities: The Hidden Cyber Risk</>,
        content: (
          <>
            Modern residential and commercial properties rely heavily on
            connected systems—CCTV cameras, smart locks, HVAC systems, and
            IoT-enabled infrastructure. While these technologies improve
            efficiency and convenience, they also introduce new cybersecurity
            risks.
            <br />
            <br />
            Unsecured devices and poorly configured networks can allow attackers
            to gain unauthorized access, monitor activity, or disrupt building
            operations. A single compromised device can act as an entry point
            into the entire property network.
            <br />
            <br />
            <strong>Marma SafeBiz</strong> provides cybersecurity solutions for
            smart buildings, offering{" "}
            <strong>real-time device monitoring</strong>,{" "}
            <strong>network security</strong>, and{" "}
            <strong>threat detection</strong> to protect connected
            infrastructure. Secure your property from the inside out—before
            vulnerabilities turn into breaches.
          </>
        ),
        imageSrc: "/images/solutions/residential/1.webp",
      },
      {
        title: <>Ransomware Attacks: Disrupting Building Operations</>,
        content: (
          <>
            Ransomware attacks can bring property operations to a standstill by
            locking critical systems such as access control, surveillance, and
            management software. This can disrupt tenant access, compromise
            security, and lead to financial and reputational damage.
            <br />
            <br />
            As buildings become more digitally connected, the risk of ransomware
            targeting property infrastructure continues to grow. Without proper
            safeguards, recovery can be costly and time-consuming.
            <br />
            <br />
            <strong>Marma SafeBiz</strong> provides{" "}
            <strong>advanced ransomware protection</strong>,{" "}
            <strong>real-time threat detection</strong>, and{" "}
            <strong>secure backup solutions</strong> to ensure business
            continuity. Don’t let cybercriminals lock down your property—protect
            your systems today.
          </>
        ),
        imageSrc: "/images/solutions/residential/2.webp",
      },
      {
        title: (
          <>
            Tenant and Operational Data Protection: Ensuring Privacy and Trust
          </>
        ),
        content: (
          <>
            Residential and commercial properties handle sensitive data,
            including tenant records, payment information, lease agreements, and
            access credentials. A data breach can expose this information,
            leading to identity theft, financial loss, and legal consequences.
            <br />
            <br />
            Tenants and clients expect their data to be handled securely, making
            cybersecurity a critical component of property management.
            <br />
            <br />
            <strong>Marma SafeBiz</strong> offers{" "}
            <strong>secure data storage</strong>, <strong>encryption</strong>,
            and <strong>continuous monitoring</strong> to protect sensitive
            information and ensure compliance with data protection regulations.
            Protect your tenants’ privacy and maintain trust with proactive
            cybersecurity.
          </>
        ),
        imageSrc: "/images/solutions/residential/3.webp",
      },
      {
        title: (
          <>
            Connected Infrastructure and Access Control: Securing Every Entry
            Point
          </>
        ),
        content: (
          <>
            From smart locks and access cards to surveillance systems and remote
            monitoring platforms, modern properties depend on interconnected
            systems. Each connection point represents a potential vulnerability
            if not properly secured.
            <br />
            <br />
            Attackers can exploit weak access controls or unsecured networks to
            gain entry into systems, manipulate controls, or monitor activity.
            <br />
            <br />
            <strong>Marma SafeBiz</strong> secures every layer of your
            property’s digital infrastructure with{" "}
            <strong>zero-trust architecture</strong>,{" "}
            <strong>access control protection</strong>, and{" "}
            <strong>continuous monitoring</strong>. Ensure every entry
            point—physical and digital—is protected.
          </>
        ),
        imageSrc: "/images/solutions/residential/4.webp",
      },
    ],
  },
};

export async function getIndustryBySlug(slug: string): Promise<IndustryData> {
  const fallback = industriesData[slug] || industriesData.healthcare;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;

    if (!tenantSlug) {
      return fallback;
    }

    const res = await fetch(`${apiUrl}/api/v1/industries/active/${slug}`, {
      headers: {
        'x-tenant-slug': tenantSlug,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return fallback;
    }

    const json = await res.json();
    const data = json.data || json;

    if (!data || !data.id) return fallback;

    const extra = data.extra_field || {};

    const parseJSON = (val: any) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    };

    const parsedSections = parseJSON(extra.sections) || parseJSON(data.use_cases);
    const validSections = Array.isArray(parsedSections) && parsedSections.length > 0
      ? parsedSections
      : fallback.sections;

    const rawImageSrc = parseJSON(extra.hero_imageSrc) || parseJSON(data.hero_image);
    const validImageSrc = rawImageSrc || fallback.hero.imageSrc;

    return {
      hero: {
        title: data.title || extra.hero_title || fallback.hero.title,
        description: extra.hero_description || data.subtitle || data.content || fallback.hero.description,
        imageSrc: validImageSrc,
        buttonText: extra.hero_buttonText || fallback.hero.buttonText,
      },
      sections: validSections,
    };
  } catch (error) {
    console.error(`Error fetching industry by slug (${slug}):`, error);
    return fallback;
  }
}

